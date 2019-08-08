var AWS = require("aws-sdk");
var s3 = new AWS.S3({
    accessKeyId: "<Enter Here>",
    secretAccessKey: "<ENTER HERE>"
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

module.exports = {
    uploadImage: (req, res) => {
        console.log("IN THE IMG CONTROLLER")
        // console.log(req)
        // var name = req.body

        var profilePhoto = {
            name: "DANNY",
            image: 'ANOTHER NAME'
        }
        console.log("PROFILE PHOTO")
        console.log(profilePhoto)

        updatePhoto(req, profilePhoto.image, function (location) {
            console.log("LOCATION")
            console.log(location)
        })
    }
}