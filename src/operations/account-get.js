import fs from 'fs'

const getAccount = accountName => {
    const accountJSON = fs.readFileSync(`src/db-accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })
    return JSON.parse(accountJSON)
}

export default getAccount
