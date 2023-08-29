import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'
import main from '../../main.js'

const createAccount = () => {
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Pick a name for the account:'
            }
        ])
        .then(response => {
            const accountName = response['accountName']

            if (!fs.existsSync('src/db-accounts'))
                fs.mkdirSync('src/db-accounts')

            if (fs.existsSync(`src/db-accounts/${accountName}.json`)) {
                console.log(
                    chalk.bgRed.black(
                        'The username you tried is already in use! Please choose a different one.'
                    )
                )
                return createAccount()
            }

            fs.writeFileSync(
                `src/db-accounts/${accountName}.json`,
                '{"balance": 0}',
                err => {
                    console.log(err)
                }
            )

            console.log(
                chalk.green('Your account has been successfully created!')
            )

            return main()
        })
        .catch(err => console.log(err))
}

export default createAccount
