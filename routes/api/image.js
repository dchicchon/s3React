// var express = require('express');
// var Image = require('../models/image');
var ImageRouter = require("express").Router();
const multer = require('multer');
const multerS3 = require("multer-s3")

var AWS = require("aws-sdk");
// const multer = require("multer")

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         console.log("DESTINATION")
//         console.log(file)
//         cb(null, '../../Desktop/')
//     },
//     filename: function (req, file, cb) {
//         console.log("FILE")
//         console.log(file)
//         cb(null, Date.now() + file.originalname)
//     }
// });

// const fileFilter = (req, file, cb) => {
//     console.log(file.mimetype)
//     console.log(file)
//     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//         console.log("HERE")
//         cb(null, true)
//     } else {
//         console.log("HERE2")
//         cb(null, false)
//     }
// }
var s3 = new AWS.S3({
    // accessKeyId: 
    // secretAccessKey: 
})

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'travelerdb',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname })
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    // fileFilter: fileFilter
});

ImageRouter.route('/image')
    .post(upload.single('imageData'), (req, res, next) => {
        console.log("IMAGE ROUTE POST")
        console.log(req.body)
        // const newImage = new Image({
        //     imageName: req.body.imageName,
        //     imageData: req.file.path
        // })


        // newImage.save()
        //     .then((res) => {
        //         console.log(res)
        //         res.status(200).json({
        //             success: true,
        //             document: res
        //         })
        //     })
        //     .catch((err) => next(err))
    })


function updatePhoto(req, image, cb) {
    console.log(req.headers)
    // console.log(req.files)
    console.log(req.body)
    // var imageFile = req.files.file.data;
    // console.log(imageFile)
    s3.createBucket(function () {
        var params = {
            Bucket: "travelerdb",
            ACL: "public-read",
            Key: `${image}.jpg`,
            Body: image
        }

        s3.upload(params, function (err, data) {
            if (err) {
                console.log("ERROR WITH UPLOAD")
                console.log(err)
            } else {
                console.log("UPLOAD SUCCESS")
                console.log("IMAGE", data)
                cb(data.location)
            }
        })
    })
}

module.exports = ImageRouter
// module.exports = {
//     uploadImage: (req, res) => {
//         console.log("IN THE IMG CONTROLLER")
//         // console.log(req)
//         // var name = req.body

//         var profilePhoto = {
//             name: "DANNY",
//             image: 'ANOTHER NAME'
//         }
//         console.log("PROFILE PHOTO")
//         console.log(profilePhoto)

//         updatePhoto(req, profilePhoto.image, function (location) {
//             console.log("LOCATION")
//             console.log(location)
//         })
//     }
// }

// const router = require("express").Router();
// const imageController = require("../../controllers/image-controller")

// router.route("/image")
//     // .post(imageController.uploadImage)
//     .post(imageController.upload.single('imageData'))
