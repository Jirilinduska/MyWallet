const mergeCategoryData = (categories) => {
    const merged = {}
  
    for (const item of categories) {
      const id = String(item.categoryID)
  
      if (!merged[id]) {
        merged[id] = {
          categoryID: id,
          total: item.total,
          count: item.count,
          planned: item.planned,
          maxTransaction: item.maxTransaction
        }
      } else {
        merged[id].total += item.total
        merged[id].count += item.count
        merged[id].planned += item.planned
  
        // Pokud je nová maxTransaction větší, nahraď
        if (
          item.maxTransaction &&
          item.maxTransaction.amount > (merged[id].maxTransaction?.amount || 0)
        ) {
          merged[id].maxTransaction = item.maxTransaction
        }
      }
    }
  
    return Object.values(merged)
  }
  
  module.exports = { mergeCategoryData }
  