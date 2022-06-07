const express = require("express");
const knex = require("knex")({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
const cors = require("cors");

const app = express();

app.use(cors());

let datas;

knex
  .select("*")
  .from("students")
  .then((res) => {
    datas = res;
  });

app.get("/", (req, res) => {
  res.send(datas);
});

// app.get("/", (req, res) => {
//   res.send('ok!');
// });

app.listen(process.env.PORT || 4000);
