const express = require("express");
// const knex = require("knex")({
//   client: "pg",
//   connection: {
//     host: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false
//     }
//   },
// });
const cors = require("cors");

const app = express();

app.use(cors());

let data;

// knex
//   .select("*")
//   .from("students")
//   .then((res) => {
//     data = res;
//   });

app.get("/", (req, res) => {
  res.send('ok!');
});

app.listen(process.env.PORT || 4000);
