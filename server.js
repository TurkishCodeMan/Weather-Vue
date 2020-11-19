const express = require ("express");
const path = require("path");
const serveStatic = require("serve-static");
const app = express();

app.use ("/",serveStatic(path.join(__dirname,"/dist")));

app.get(/.*/,(req,res)=>{
    res.sendFile(path.join(__dirname,"/dist/index.html"));
})

const port = process.env.PORT || 8080;

app.listen(port);
console.log("Listening on port "+port);