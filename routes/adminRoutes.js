const { getAdmins } = require("../controllers/adminContoller");




const router = require("express").Router()

//roles route

router.get("/", getAdmins);


module.exports = router;