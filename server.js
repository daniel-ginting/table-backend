const express = require("express");
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "danielginting",
    password: "3232",
    database: "demo",
  },
});
const cors = require("cors");

const app = express();

app.use(cors());

let data;

knex
  .select("*")
  .from("students")
  .then((res) => {
    data = res;
  });

app.get("/data", (req, res) => {
  res.send(data);
});

app.listen(4000);
