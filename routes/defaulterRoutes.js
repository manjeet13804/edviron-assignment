const { getDefaulters, getDefaultersLast30days } = require("../controllers/defaulterContoller");

//router
const router = require("express").Router()

//roles route

router.get("/", getDefaulters);
router.get("/last30days", getDefaultersLast30days);


module.exports = router;