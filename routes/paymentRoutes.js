const { getPayment, getPaymentById } = require("../controllers/paymentContoller");



const router = require("express").Router()

//roles route

router.get("/", getPayment);
router.get('/:id', getPaymentById);

module.exports = router;