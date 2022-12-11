const express = require("express");
const app = express();

app.get("/", function(req, res){
   res.send("app.js is loading...............");
})

app.listen(3000, () => {
    console.log("running on http://localhost:3000/")
})