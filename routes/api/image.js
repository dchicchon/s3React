const router = require("express").Router();
const imageController = require("../../controllers/image-controller")

router.route("/image")
    .post(imageController.uploadImage)

module.exports = router