const express = require("express");
const app = express();
const mariadb = require("mariadb");
// const pool = mariadb.createPool({host: process.env.DB_HOST, user: process.env.root, connectionLimit: 5});

// async function asyncFunction() {
//   let conn;
//   try {

// 	conn = await pool.getConnection();
// 	const rows = await conn.query("SELECT 1 as val");
// 	// rows: [ {val: 1}, meta: ... ]

// 	const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
// 	// res: { affectedRows: 1, insertId: 1, warningStatus: 0 }

//   } finally {
// 	if (conn) conn.release(); //release to pool
//   }
// }

async function asyncFunction() {
  const conn = await mariadb.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    db: "AvengerDb"
  });

  try {
    const res = await conn.query("select 1", [2]);
    console.log(res); // [{ "1": 1 }]
    return res;
  } finally {
    conn.end();
  }
}

app.get("/", function(req, res){
   res.send(asyncFunction());
})

app.listen(3000, () => {
    console.log("running on http://localhost:3000/")
})