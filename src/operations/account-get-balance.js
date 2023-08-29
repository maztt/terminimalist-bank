import inquirer from 'inquirer'
import chalk from 'chalk'
import checkAccount from './account-check.js'
import getAccount from './account-get.js'
import main from '../../main.js'

const getAccountBalance = () => {
    inquirer
        .prompt([
            {
                name: 'accountName',
                message:
                    'Specify the account you want to check the available balance.'
            }
        ])
        .then(response => {
            const accountName = response['accountName']

            if (!checkAccount(accountName)) {
                console.log(
                    'You have not specified the account! Returning to menu...'
                )
                return accountBalance()
            }

            const accountData = getAccount(accountName)
            console.log(
                chalk.bgBlue.black(
                    `Hello, ${accountName}! Your available balance is: $ ${accountData.balance}.`
                )
            )

            console.log('Returning to menu...')
            return main()
        })
        .catch(err => console.log(err))
}

export default getAccountBalance