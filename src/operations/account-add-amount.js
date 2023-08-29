import chalk from 'chalk'
import fs from 'fs'
import getAccount from './account-get.js'

const accountAddAmount = (accountName, amount) => {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log('You have not specified the amount! Returning try again.')
        return accountDeposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(
        `src/db/${accountName}.json`,
        JSON.stringify(accountData),
        err => console.log(err)
    )

    console.log(
        chalk.green(
            `You have just deposited $${amount} to ${accountName}'s account.`
        )
    )
}

export default accountAddAmount
