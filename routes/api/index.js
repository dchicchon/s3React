const router = require("express").Router();

const ImageRoute = require("./image")

router.use(ImageRoute)

module.exports = router