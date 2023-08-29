import inquirer from 'inquirer'
import { accountRemoveAmount, checkAccount } from './index.js'
import main from '../../main.js'

const accountWithdraw = (accountName, amount) => {
    inquirer
        .prompt([
            {
                name: 'accountName',
                message:
                    'What is the account you want to withdraw from (type "Back" to exit)?'
            }
        ])
        .then(response => {
            const accountName = response['accountName']

            if (accountName === 'Back') {
                return main()
            }
            if (!checkAccount(accountName)) {
                return accountWithdraw()
            }

            inquirer
                .prompt([
                    {
                        name: 'amount',
                        message:
                            'How much do you want to withdraw from the account?'
                    }
                ])
                .then(response => {
                    const amount = response['amount']
                    accountRemoveAmount(accountName, amount)
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

export { accountWithdraw }
