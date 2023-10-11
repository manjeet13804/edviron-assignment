const { getStudents } = require("../controllers/studentContoller");

const router = require("express").Router()

//roles route

router.get("/", getStudents);



module.exports = router;