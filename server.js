const express = require("express");
// const multer = require("multer");
const routes = require("./routes");

const app = express();

const PORT = 5000;


app.use(routes)

app.use((req, res, next) => {
    console.log("MIDDLEWARE")
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', '*');  // enables all the methods to take place
    return next();
})

app.listen(PORT, () => {
    console.log("APP LISTENING ON PORT: " + PORT)
})