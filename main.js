const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')

function main() {
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
    .then(response => {
      const action = response['action']

      if (action === 'Open a new bank account') {
        accountCreate()
      } else if (action === 'Check available balance') {
        accountBalance()
      } else if (action === 'Deposit') {
        accountDeposit()
      } else if (action === 'Withdraw') {
        accountWithdraw()
      } else if (action === 'Leave') {
        console.log(chalk.bgBlue.black('Thank you for using Accounts!'))
        process.exit()
      }
    })
    .catch(err => console.log(err))
}

header()
main()


function accountCreate() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Pick a name for the account:'
      }
    ])
    .then(response => {
      const accountName = response['accountName']

      if (!fs.existsSync('src/db-accounts')) fs.mkdirSync('src/db-accounts')

      if (fs.existsSync(`src/db-accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black(
            'The username you tried is already in use! Please choose a different one.'
          )
        )
        return accountCreate()
      }

      fs.writeFileSync(
        `src/db-accounts/${accountName}.json`,
        '{"balance": 0}',
        err => {
          console.log(err)
        }
      )

      console.log(chalk.green('Your account has been successfully created!'))

      return main()
    })
    .catch(err => console.log(err))
}

function accountCheck(accountName) {
  if (!fs.existsSync(`src/db-accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black('The account does not exist! Try again.'))
    return false
  } else {
    return true
  }
}

function accountGet(accountName) {
  const accountJSON = fs.readFileSync(`src/db-accounts/${accountName}.json`, {
    encoding: 'utf8',
    flag: 'r'
  })
  return JSON.parse(accountJSON)
}

function accountBalance() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Specify the account you want to check the available balance.'
      }
    ])
    .then(response => {
      const accountName = response['accountName']

      if (!accountCheck(accountName)) {
        console.log('You have not specified the account! Returning to menu...')
        return accountBalance()
      }

      const accountData = accountGet(accountName)
      console.log(
        chalk.bgBlue.black(
          `Hello, ${accountName}! Your available balance is: $ ${accountData.balance}.`
        )
      )

      console.log('Returning to menu...')
      return main()
    })
    .catch(err => console.log(err))
}

function accountDeposit() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'What is the account you want to deposit to?'
      }
    ])
    .then(response => {
      const accountName = response['accountName']

      if (!accountCheck(accountName)) {
        return accountDeposit()
      }

      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'How much do you want to deposit into the account?'
          }
        ])
        .then(response => {
          const amount = response['amount']
          addAmount(accountName, amount)

          return main()
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

function addAmount(accountName, amount) {
  const accountData = accountGet(accountName)

  if (!amount) {
    console.log('You have not specified the amount! Returning try again.')
    return accountDeposit()
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

  fs.writeFileSync(
    `src/db-accounts/${accountName}.json`,
    JSON.stringify(accountData),
    err => console.log(err)
  )

  console.log(
    chalk.green(`You have just deposited $${amount} to ${accountName}'s account.`)
  )
}

function accountWithdraw(accountName, amount) {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'What is the account you want to withdraw from?'
      }
    ])
    .then(response => {
      const accountName = response['accountName']

      if (!accountCheck(accountName)) {
        return accountWithdraw()
      }

      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'How much do you want to withdraw from the account?'
          }
        ])
        .then(response => {
          const amount = response['amount']
          removeAmount(accountName, amount)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

function removeAmount(accountName, amount) {
  const accountData = accountGet(accountName)

  if (!amount) {
    console.log(
      chalk.bgRed.black('You have not specified the amount! Try again.')
    )
    return accountWithdraw()
  }

  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black(`$${accountData.balance} is your balance at the moment! Try again.`))
    return accountWithdraw()
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

  fs.writeFileSync(
    `src/db-accounts/${accountName}.json`,
    JSON.stringify(accountData),
    err => console.log(err)
  )

  console.log(chalk.green(`You have just withdrawed $ ${amount} from your bank account.`))
  return main()
}

function header() {
  console.log(chalk.bgGreen.black('------------------'))
  console.log(chalk.green('TERMINIMALIST BANK'))
  console.log(chalk.bgGreen.black('------------------'))
}