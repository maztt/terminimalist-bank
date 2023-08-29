import chalk from 'chalk'
import fs from 'fs'
import { getAccount, accountWithdraw } from './index.js'
import main from '../../main.js'

const accountRemoveAmount = (accountName, amount) => {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(
            chalk.bgRed.black('You have not specified the amount! Try again.')
        )
        return accountWithdraw()
    }

    if (accountData.balance < amount) {
        console.log(
            chalk.bgRed.black(
                `$${accountData.balance} is your balance at the moment! Try again.`
            )
        )
        return accountWithdraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `src/db/${accountName}.json`,
        JSON.stringify(accountData),
        err => console.log(err)
    )

    console.log(
        chalk.green(
            `You have just withdrawed $ ${amount} from your bank account.`
        )
    )
    return main()
}

export { accountRemoveAmount }
