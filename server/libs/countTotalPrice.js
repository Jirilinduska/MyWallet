const countTotalPrice = (array) => {
    return array.reduce((total, transaction) => total + transaction.amount, 0)
}

module.exports = { countTotalPrice }
