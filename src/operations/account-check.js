import chalk from 'chalk'
import fs from 'fs'

const checkAccount = accountName => {
    if (!fs.existsSync(`src/db/${accountName}.json`)) {
        console.log(chalk.bgRed.black('The account does not exist! Try again.\n'))
        return false
    }
    
    return true
}

export { checkAccount }
