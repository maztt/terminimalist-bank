import chalk from 'chalk'
import fs from 'fs'
import { getAccount, accountWithdraw } from './index.js'
import { sleep } from '../utils/index.js'
import main from '../../main.js'

const accountRemoveAmount = async (accountName, amount) => {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(chalk.bgRed.black('You have not specified the amount! Try again.'))
        return accountWithdraw()
    }

    if (accountData.balance < amount) {
        console.log(chalk.bgRed.black(`$${accountData.balance} is your balance at the moment! Try again.\n`))
        return accountWithdraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `src/db/${accountName}.json`,
        JSON.stringify(accountData),
        err => console.error(err)
    )

    console.log(chalk.green(`You have just withdrawed $ ${amount}.00 from your bank account.\n`))
    console.log(chalk.bgGray.black('Returning to menu...'))
    await sleep(3)
    return main()
}

export { accountRemoveAmount }
