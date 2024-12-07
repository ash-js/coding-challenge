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

  // Calculate sales_total for Gross Profit Margin
  const salesTotal = accounts
    .filter(
      (account) =>
        account.account_type === 'sales' && account.value_type === 'debit'
    )
    .reduce((sum, account) => sum + account.total_value, 0)

  // Calculate Gross Profit Margin
  const grossProfitMargin = revenue > 0 ? (salesTotal / revenue) * 100 : 0
})
