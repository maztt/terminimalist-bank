import inquirer from 'inquirer'
import chalk from 'chalk'
import { accountRemoveAmount, checkAccount } from './index.js'
import { sleep } from '../utils/index.js'
import main from '../../main.js'

const accountWithdraw = (accountName, amount) => {
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'What is the account you want to withdraw from? ("Back" to exit)\n >>>>'
            }
        ])
        .then(async response => {
            const accountName = response['accountName']

            if (accountName === 'Back') {
                console.log(chalk.bgGray.black('\nReturning to menu...'))
                await sleep(3)
                return main()
            }

            if (!checkAccount(accountName)) {
                return accountWithdraw()
            }

            inquirer
                .prompt([
                    {
                        name: 'amount',
                        message: 'How much do you want to withdraw from the account? (e.g.: 1, 100, 23)\n >>>>'
                    }
                ])
                .then(response => {
                    const amount = response['amount']
                    accountRemoveAmount(accountName, amount)
                })
                .catch(err => console.error(err))
        })
        .catch(err => console.error(err))
}

export { accountWithdraw }
