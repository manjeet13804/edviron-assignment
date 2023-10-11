const { getDocumentStructure } = require("../controllers");




const router = require("express").Router()

//roles route

router.get("/", getDocumentStructure);


module.exports = router;