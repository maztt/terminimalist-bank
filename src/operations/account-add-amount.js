import chalk from 'chalk'
import fs from 'fs'
import { getAccount, accountDeposit } from './index.js'

const accountAddAmount = async (accountName, amount) => {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log('You have not specified the amount! Try again.\n')
        return accountDeposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(
        `src/db/${accountName}.json`,
        JSON.stringify(accountData),
        err => console.error(err)
    )

    console.log(chalk.green(`You have just deposited $${amount} to ${accountName}'s account.\n`))
}

export { accountAddAmount }
