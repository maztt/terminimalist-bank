import inquirer from 'inquirer'
import chalk from 'chalk'
import { checkAccount, getAccount } from './index.js'
import { sleep } from '../utils/index.js'
import main from '../../main.js'

const getAccountBalance = () => {
    inquirer
        .prompt([
            {
                name: 'accountName',
                message:
                    'Specify the account you want to check the available balance.\n >>>>'
            }
        ])
        .then(async response => {
            const accountName = response['accountName']

            if (!checkAccount(accountName)) {
                return getAccountBalance()
            }

            const accountData = getAccount(accountName)
            console.log(chalk.bgBlue.black(`Hello, ${accountName}! Your available balance is: $ ${accountData.balance}.00.\n`))
            console.log(chalk.bgGray.black('Returning to menu...'))
            await sleep(3)
            return main()
        })
        .catch(err => console.error(err))
}

export { getAccountBalance }
