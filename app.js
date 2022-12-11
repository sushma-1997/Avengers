const express = require("express");
const app = express();
const ngrok = require("ngrok");

app.get("/", function(req, res){
   res.send("app.js is loading...............");
})

app.listen(8000, () => {
    console.log("running on http://localhost:8000/")
})

ngrok.connect({
    proto : 'http',
    addr : process.env.PORT,
}, (err, url) => {
    if (err) {
        console.error('Error while connecting Ngrok',err);
        return new Error('Ngrok Failed');
    }
});