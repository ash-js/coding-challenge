const fs = require('fs')

// Read data from data.json
fs.readFile('./data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading data.json:', err)
    return
  }

  const jsonData = JSON.parse(data)
  const accounts = jsonData.data

  // Calculate Revenue
  const revenue = accounts
    .filter((account) => account.account_category === 'revenue')
    .reduce((sum, account) => sum + account.total_value, 0)

  // Calculate Expenses
  const expenses = accounts
    .filter((account) => account.account_category === 'expense')
    .reduce((sum, account) => sum + account.total_value, 0)
})
