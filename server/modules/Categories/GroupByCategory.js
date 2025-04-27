const groupByCategory = (transactions) => {
  const grouped = {};

  transactions.forEach((tx) => {
    const id = tx.category.toString() || "unknown category";

    if (!grouped[id]) {
      grouped[id] = {
        total: 0,
        count: 0,
        maxTransaction: {
          title: "",
          amount: 0,
          day: "",
          year: 0,
          month: 0,
          transCategory: "",
          createdAt: new Date(),
        },
      };
    }
    // Součet transakcí
    grouped[id].total += tx.amount;
    grouped[id].count += 1;

    // Maximální transakce
    if (tx.amount > grouped[id].maxTransaction.amount) {
      grouped[id].maxTransaction = {
        title: tx.title || "",
        amount: tx.amount,
        day: tx.day || "",
        year: tx.year || 0,
        month: tx.month || 0,
        transCategory: tx.transCategory || "",
        createdAt: tx.createdAt || new Date(),
      };
    }
  });

  return Object.entries(grouped).map(([categoryID, data]) => ({
    categoryID,
    total: data.total,
    count: data.count,
    maxTransaction: data.maxTransaction,
  }));
};

module.exports = { groupByCategory };
