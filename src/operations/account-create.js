import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'
import main from '../../main.js'
import { sleep } from '../utils/index.js'

const createAccount = () => {
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Pick a name for the account (e.g.: "John", "John Doe")\n >>>>'
            }
        ])
        .then(async response => {
            const accountName = response['accountName']

            if (!fs.existsSync('src/db')) fs.mkdirSync('src/db')

            if (fs.existsSync(`src/db/${accountName}.json`)) {
                console.log(chalk.bgRed.black('The username you tried is already in use! Please choose a different one.\n'))
                return createAccount()
            }

            fs.writeFileSync(
                `src/db/${accountName}.json`,
                '{"balance": 0}',
                err => {
                    console.error(err)
                }
            )

            console.log(chalk.green('Your account has been successfully created!\n'))
            console.log(chalk.bgGray.black('Returning to menu...'))
            await sleep(3)         
            return main()
        })
        .catch(err => console.error(err))
}

export { createAccount }
