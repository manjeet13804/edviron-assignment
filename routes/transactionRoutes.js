const { getTransaction, getTotalSuccessfulTransactions, getTotalSuccessfulTransactionsPercentage } = require("../controllers/transactionContoller");

const router = require("express").Router()

//roles route

router.get("/", getTransaction);

router.get("/success", getTotalSuccessfulTransactions);

router.get("/successBreakdownPercentage", getTotalSuccessfulTransactionsPercentage);
module.exports = router;