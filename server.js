const express = require ("express");
const path = require("path");

const app = express();

app.use (express.static(__dirname,"/dist"));

const port = process.env.PORT || 3000;

app.listen(port=>{
    console.log("Listening port "+port);
});