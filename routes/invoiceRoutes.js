const { getInvoices, getTotalFine } = require("../controllers/invoiceContoller");


const router = require("express").Router()

//roles route

router.get("/", getInvoices);

router.get("/fines", getTotalFine);

module.exports = router;