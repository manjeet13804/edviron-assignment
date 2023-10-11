const { getFeeheads } = require("../controllers/feaheadContoller");


const router = require("express").Router()

//roles route

router.get("/", getFeeheads);


module.exports = router;