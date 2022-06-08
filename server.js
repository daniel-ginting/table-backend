const express = require("express");
const bodyParser = require("body-parser");
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

app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Please use other URL parameter");
});

app.get("/students", (req, res) => {
  // grab students
  knex
    .select("*")
    .from("students")
    .then((res2) => {
      res.send(res2);
    });
});

app.post("/insert-student", (req, res) => {
  // add student
  knex("students")
    .insert({ fullname: req.body.fullname, dateofbirth: req.body.dateofbirth })
    .then(() => res.json("success adding student"));
});

app.listen(process.env.PORT || 4000);
// app.listen(3000);
