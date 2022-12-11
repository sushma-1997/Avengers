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
    "Select avenger_name,avenger_category,about_avenger,year_joined,years_since_joined,introduction_date,number_of_appearances,serving_currently,honorary,number_of_deaths,number_of_returns from Avengers as A,AvengersDeathsAndReturns as DR WHERE (A.avenger_id=DR.avenger_id) AND number_of_deaths>1 AND number_of_deaths>1;",
  "Display the number of males who received Full Honorary in Old Generation Avengers and Females who received Full Honorary in new Generation Avengers":
    {
      males: {
        table:
          "Select * from Avengers where (honorary = 'Full' AND avenger_category = 'MALE' AND year_joined<2010);",
        count:
          "Select COUNT(*) from Avengers where (honorary = 'Full' AND avenger_category = 'MALE' AND year_joined<2010);",
      },
      females: {
        table:
          "Select * from Avengers where (honorary = 'Full' AND avenger_category = 'FEMALE' AND year_joined>=2010);",
        count:
          "Select COUNT(*) from Avengers where (honorary = 'Full' AND avenger_category = 'FEMALE' AND year_joined>=2010);",
      },
    },
  "What characters have probationary-based intros":
    "Select * from Avengers where probationary_intro_date <> '';",
};

// ============= functions ================== //

async function getRows(query) {
  try {
    const sqlQuery = query;
    const rows = await pool.query(sqlQuery);
    // console.log(rows)
    // res.status(200).json(rows);
    // res.render("index/arrayResults.ejs", { rows: rows });
    return rows;
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// ============= Routes ==================== //

router.get("/dashboard", function (req, res) {
  res.render("index/dashboard.ejs");
});

router.post("/faqs", async function (req, res) {
  if (
    req.body.faq ==
    "Display the number of males who received Full Honorary in Old Generation Avengers and Females who received Full Honorary in new Generation Avengers"
  ) {
    let faq = req.body.faq;
    // console.log("staticSqlCommand1" + staticSqlCommands[faq]);
    // res.status(200).json(staticSqlCommands[faq]);
    let maleCountCommand = staticSqlCommands[faq]["males"]["count"];
    let maleTableCommand = staticSqlCommands[faq]["males"]["table"];
    let femaleCountCommand = staticSqlCommands[faq]["females"]["count"];
    let femaleTableCommand = staticSqlCommands[faq]["females"]["table"];
    // console.log('maleCountCommand: '+maleCountCommand)
    // console.log('maleTableCommand: '+maleTableCommand)
    // console.log('femaleCountCommand: '+femaleCountCommand)
    // console.log('femaleTableCommand: '+femaleTableCommand)
    try {
      const maleCount = await pool.query(maleCountCommand);
      //   console.log('maleCount: '+maleCount)
      //   res.status(200).json(maleCount);
      const maleRows = await pool.query(maleTableCommand);
      const femaleCount = await pool.query(femaleCountCommand);
      const femaleRows = await pool.query(femaleTableCommand);
      // console.log(rows)
      // res.status(200).json(rows);
      res.render("index/specialArrayResults.ejs", {
        maleCount: maleRows.length,
        maleRows: maleRows,
        femaleCount: femaleRows.length,
        femaleRows: femaleRows,
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    var faq = req.body.faq;
    // console.log(faq);
    let sqlCommand = staticSqlCommands[faq];
    // console.log(sqlCommand);
    try {
      const sqlQuery = sqlCommand;
      const rows = await pool.query(sqlQuery);
      // console.log(rows)
      // res.status(200).json(rows);
      res.render("index/newArrayResults.ejs", { rows: rows });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
  // console.log(rows)
  //   res.status(200).json({ idnumber: req.params.idnumber });
});

router.get("/querytest", async function (req, res) {
  try {
    const sqlQuery =
      "Select * from Avengers where probationary_intro_date <> '';";
    const rows = await pool.query(sqlQuery);
    // console.log(rows)
    // res.status(200).json(rows);
    res.render("index/newArrayResults.ejs", { rows: rows });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/find-forms", function (req, res) {
  res.render("index/findForms.ejs");
});

router.post("/find-forms/category-appearances", async function (req, res) {
  try {
    const sqlQuery =
      "Select * from Avengers where avenger_category=UPPER(" +
      "'" +
      req.body.category +
      "'" +
      ") AND serving_currently = 'YES' AND number_of_appearances>" +
      req.body.appearances +
      ";";
    const rows = await pool.query(sqlQuery);
    // console.log(rows)
    // res.status(200).json(rows);
    res.render("index/newArrayResults.ejs", { rows: rows });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/find-forms/years-since-joined", async function (req, res) {
  // let query =
  //   "Select * from Avengers where years_since_joined>" +
  //   req.body.yearsSinceJoined +
  //   ";";
  // let rows = getRows(query);
  // console.log('rows' + rows);
  // res.render("index/arrayResults.ejs", { rows: rows });
  try {
    const sqlQuery =
      "Select * from Avengers where years_since_joined>" +
      req.body.yearsSinceJoined +
      ";";
    console.log(sqlQuery);
    const rows = await pool.query(sqlQuery);
    // console.log(rows)
    // res.status(200).json(rows);
    res.render("index/newArrayResults.ejs", { rows: rows });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/find-forms/deaths-introDate", async function (req, res) {
  try {
    const sqlQuery =
      "Select avenger_name,avenger_category,about_avenger,year_joined,years_since_joined,introduction_date,number_of_appearances,serving_currently,honorary,is_dead,number_of_deaths,is_returned,number_of_returns from Avengers as A,AvengersDeathsAndReturns as DR where (A.avenger_id=DR.avenger_id) and number_of_deaths>" +
      req.body.numberOfDeaths +
      " AND introduction_date='" +
      req.body.introductionDate +
      "';";
    console.log(sqlQuery);
    const rows = await pool.query(sqlQuery);
    res.render("index/newArrayResults.ejs", { rows: rows });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/find-forms/avenger-name", async function (req, res) {
  try {
    const sqlQuery = "Select avenger_name,avenger_category,about_avenger,year_joined,years_since_joined,introduction_date,number_of_appearances,serving_currently,honorary,probationary_intro_date,is_dead,number_of_deaths,is_returned,number_of_returns from Avengers AS A,AvengersDeathsAndReturns AS DR where (A.avenger_id=DR.avenger_id) AND avenger_name LIKE '%thor%';";
    console.log(sqlQuery);
    const rows = await pool.query(sqlQuery);
    console.log(rows);
    res.render("index/newArrayResults.ejs", { rows: rows });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
