const { getSections, getSectionCountsByClass } = require("../controllers/sectionControllers");

const router = require("express").Router()

//roles route

router.get("/", getSections);

router.get("/countClasses", getSectionCountsByClass);

module.exports = router;