const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

router.get("/dashboard", function(req, res){
    res.render("index/dashboard.ejs")
})

router.get('/all/:query', async function(req,res){
    try {
        const sqlQuery = 'Select * from avengers where avenger_id='+req.params.query+';';
        const rows = await pool.query(sqlQuery);
        // console.log(rows)
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
    // console.log(rows)

    res.status(200).json({idnumber:req.params.idnumber})
});

module.exports = router;