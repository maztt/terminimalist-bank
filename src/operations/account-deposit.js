import inquirer from 'inquirer'
import chalk from 'chalk'
import { accountAddAmount, checkAccount } from './index.js'
import { sleep } from '../utils/index.js'
import main from '../../main.js'

const accountDeposit = () => {
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'What is the account you want to deposit to?\n >>>>'
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
                            'How much do you want to deposit into the account? (e.g.: 1, 100, 23)\n >>>>'
                    }
                ])
                .then(async response => {
                    const amount = response['amount']
                    accountAddAmount(accountName, amount)
                    console.log(chalk.bgGray.black('Returning to menu...'))
                    await sleep(3)
                    return main()
                })
                .catch(err => console.error(err))
        })
        .catch(err => console.error(err))
}

export { accountDeposit }
