import inquirer from 'inquirer'
import chalk from 'chalk'
import {
    createAccount,
    getAccountBalance,
    accountDeposit,
    accountWithdraw
} from './index.js'

const bankInitialization = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'I want to...',
                choices: [
                    'Open a new bank account',
                    'Check available balance',
                    'Deposit',
                    'Withdraw',
                    'Leave'
                ]
            }
        ])
        .then(async response => {
            const action = response['action']

            if (action === 'Open a new bank account') {
                createAccount()
            } else if (action === 'Check available balance') {
                getAccountBalance()
            } else if (action === 'Deposit') {
                accountDeposit()
            } else if (action === 'Withdraw') {
                accountWithdraw()
            } else if (action === 'Leave') {
                console.log(chalk.bgBlue.black('Thank you for using Accounts!'))
                process.exit()
            }
        })
        .catch(err => console.log(err))
}

export { bankInitialization }
