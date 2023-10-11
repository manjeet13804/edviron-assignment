const { getFines } = require("../controllers/fineContoller");



const router = require("express").Router()

//roles route

router.get("/", getFines);


module.exports = router;