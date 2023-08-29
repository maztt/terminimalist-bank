import inquirer from 'inquirer'
import { accountAddAmount, checkAccount } from './index.js'
import main from '../../main.js'

const accountDeposit = () => {
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'What is the account you want to deposit to?'
            }
        ])
        .then(response => {
            const accountName = response['accountName']

            if (!checkAccount(accountName)) {
                return accountDeposit()
            }

            inquirer
                .prompt([
                    {
                        name: 'amount',
                        message:
                            'How much do you want to deposit into the account?'
                    }
                ])
                .then(response => {
                    const amount = response['amount']
                    accountAddAmount(accountName, amount)

                    return main()
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

export { accountDeposit }
