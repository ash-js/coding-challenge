/**
 * Code to calculate Gross Profit Margin, Net Profit Margin, and Working Capital Ratio in JavaScript
 * This script reads financial data from a JSON file (data.json) and calculates:
 * - Revenue
 * - Expenses
 * - Gross Profit Margin
 * - Net Profit Margin
 * - Working Capital Ratio
 *
 * Usage:
 * 1. Ensure the data.json file is in the same directory as this script.
 * 2. Run the script using Node.js: `node index.js`.
 * 3. The results will be printed to the console in the specified format.
 */
const fs = require('fs')

// Read data from data.json
fs.readFile('./data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading data.json:', err)
    return
  }

  const jsonData = JSON.parse(data)
  const accounts = jsonData.data

  // Helper function to format currency
  const formatCurrency = (value) => {
    return `$${Math.round(value)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  }

  // Helper function to format percentage
  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`
  }

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

  // Calculate Net Profit Margin
  const netProfitMargin =
    revenue > 0 ? ((revenue - expenses) / revenue) * 100 : 0

  // Calculate Assets
  const assets =
    accounts
      .filter(
        (account) =>
          account.account_category === 'assets' &&
          account.value_type === 'debit' &&
          ['current', 'bank', 'current_accounts_receivable'].includes(
            account.account_type
          )
      )
      .reduce((sum, account) => sum + account.total_value, 0) -
    accounts
      .filter(
        (account) =>
          account.account_category === 'assets' &&
          account.value_type === 'credit' &&
          ['current', 'bank', 'current_accounts_receivable'].includes(
            account.account_type
          )
      )
      .reduce((sum, account) => sum + account.total_value, 0)

  // Calculate Liabilities
  const liabilities =
    accounts
      .filter(
        (account) =>
          account.account_category === 'liability' &&
          account.value_type === 'credit' &&
          ['current', 'current_accounts_payable'].includes(account.account_type)
      )
      .reduce((sum, account) => sum + account.total_value, 0) -
    accounts
      .filter(
        (account) =>
          account.account_category === 'liability' &&
          account.value_type === 'debit' &&
          ['current', 'current_accounts_payable'].includes(account.account_type)
      )
      .reduce((sum, account) => sum + account.total_value, 0)

  // Calculate Working Capital Ratio
  const workingCapitalRatio =
    liabilities !== 0 ? (assets / liabilities) * 100 : 0

  // Format the results
  const formattedRevenue = formatCurrency(revenue)
  const formattedExpenses = formatCurrency(expenses)
  const formattedGPM = formatPercentage(grossProfitMargin)
  const formattedNPM = formatPercentage(netProfitMargin)
  const formattedWCR = formatPercentage(workingCapitalRatio)

  console.log('Revenue:', formattedRevenue)
  console.log('Expenses:', formattedExpenses)
  console.log('Gross Profit Margin:', formattedGPM)
  console.log('Net Profit Margin:', formattedNPM)
  console.log('Working Capital Ratio:', formattedWCR)
})
