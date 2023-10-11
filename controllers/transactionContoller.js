async function getTransaction(req, res) {
  try {
    // Get an instance of our database
    const db = req.db;

    const transaction = await db.collection("transactions").find({}).toArray();

    const response = {
      statusCode: 200,
      count: transaction.length,
      body: transaction,
    };
    res.send(response);
    return response;
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error :Getting Transaction",
      }),
    };
  }
}

async function getTotalSuccessfulTransactions(req, res) {
  let totalAmount = 0;
  let totalAmountThisMonth = 0;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Note: month is zero-based

  const db = req.db;

  const transaction = await db.collection("transactions").find({}).toArray();

  transaction.forEach((item) => {
    if (item.status === "SUCCESS") {
      totalAmount += item.amount;

      const paymentMonth = new Date(item.createdAt).getMonth() + 1;
      if (paymentMonth === currentMonth) {
        totalAmountThisMonth += item.amount;
      }
    }
  });

  const response = {
    statusCode: 200,
    totalAmount,
    totalAmountThisMonth,
  };
  res.send(response);
  return response;
}

async function getTotalSuccessfulTransactionsPercentage(req, res) {
  const db = req.db;

  const transactions = await db.collection("transactions").find({}).toArray();

  // Count the number of payments for each payment mode
  let cashCount = 0;
  let onlineCount = 0;
  let chequeCount = 0;

  for (const transaction of transactions) {
    switch (transaction.payment_mode) {
      case "CASH":
        cashCount++;
        break;
      case "ONLINE":
        onlineCount++;
        break;
      case "CHEQUE":
        chequeCount++;
        break;
    }
  }

  // Calculate the percentages
  const totalCount = transactions.length;
  const cashPercentage = (cashCount / totalCount) * 100;
  const onlinePercentage = (onlineCount / totalCount) * 100;
  const chequePercentage = (chequeCount / totalCount) * 100;

  const response = {
    statusCode: 200,
    cashPercentage,
    onlinePercentage,
    chequePercentage,
  };
  res.send(response);
  return response;
}

module.exports = {
  getTransaction,
  getTotalSuccessfulTransactions,
  getTotalSuccessfulTransactionsPercentage
};
