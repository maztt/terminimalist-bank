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

            switch (action) {
                case 'Open a new bank account':
                    createAccount()
                    break
                case 'Check available balance':
                    getAccountBalance()
                    break
                case 'Deposit':
                    accountDeposit()
                    break
                case 'Withdraw':
                    accountWithdraw()
                    break
                case 'Leave':
                    console.log(
                        chalk.bgGreen.black(
                            'Thank you for choosing Terminimalist Bank!'
                        )
                    )
                    process.exit()
            }
        })
        .catch(err => console.log(err))
}

export { bankInitialization }
