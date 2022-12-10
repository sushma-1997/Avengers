const express = require("express");
const router = express.Router();
const pool = require("../helpers/database");

// ============= Data =============== //

const staticSqlCommands = {
  "Who served the longest in the entire Avengers":
    "Select * from Avengers where years_since_joined=(Select MAX(years_since_joined) from Avengers);",
  "Who are the retired Old Generation Avengers characters":
    "Select * from Avengers where (year_joined<2010 AND serving_currently = 'YES');",
  "Who has the highest screen time in the entire series":
    "Select * from Avengers where number_of_appearances=(Select MAX(number_of_appearances) from Avengers);",
  "Display names of the Avengers who have resurrected/died more than once":
    "Select avenger_name,avenger_category,about_avenger,year_joined,years_since_joined,introduction_date,number_of_appearances,serving_currently,honorary,number_of_deaths from Avengers as A JOIN AvengersDeathsAndReturns as DR ON (A.avenger_id=DR.avenger_id) where number_of_deaths>1;",
};

// ============= functions ================== //

router.get("/dashboard", function (req, res) {
  res.render("index/dashboard.ejs");
});

router.post("/faqs", async function (req, res) {
  var faq = req.body.faq;
  console.log(faq);
  let sqlCommand = staticSqlCommands[faq];
  console.log(sqlCommand);
  try {
    const sqlQuery = sqlCommand;
    const rows = await pool.query(sqlQuery);
    // console.log(rows)
    // res.status(200).json(rows);
    res.render("index/arrayResults.ejs", {rows: rows})
  } catch (error) {
    res.status(400).send(error.message);
  }
  // console.log(rows)
//   res.status(200).json({ idnumber: req.params.idnumber });
});

// router.post("/all/:query", async function (req, res) {
//   try {
//     const sqlQuery =
//       "Select * from avengers where avenger_id=" + req.params.query + ";";
//     const rows = await pool.query(sqlQuery);
//     // console.log(rows)
//     res.status(200).json(rows);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
//   // console.log(rows)

//   res.status(200).json({ idnumber: req.params.idnumber });
// });

router.get("/find-forms", function (req, res) {
  res.render("index/findForms.ejs");
});

module.exports = router;
