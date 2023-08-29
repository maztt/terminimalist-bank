import chalk from 'chalk'
import fs from 'fs'

const checkAccount = accountName => {
    if (!fs.existsSync(`src/db-accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('The account does not exist! Try again.'))
        return false
    } else {
        return true
    }
}

export default checkAccount
