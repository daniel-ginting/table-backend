const express = require("express");
const knex = require("knex")({
  client: "pg",
  connection: {
  //   host: "127.0.0.1",
  //   port: 5432,
  //   user: "danielginting",
  //   password: "3232",
  //   database: "demo",
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  },
});
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Please use other URL parameter");
});

app.get("/students", (req, res) => {
  // Grab students
  knex
    .select("*")
    .from("students")
    .then((res2) => {
      res.send(res2);
    });
});

app.post("/insert-student", (req, res) => {
  // Grab latest id
  let id;
  knex
    .select("latestid")
    .from("idstorage")
    .then((res1) => {
      id = res1[0].latestid;
      console.log(id);
      // Another request
      knex("students")
        .insert({
          id: id + 1,
          fullname: req.body.fullname,
          dateofbirth: req.body.dateofbirth,
        })
        // Update id storage
        .then(() => {
          res.json("success adding student");
          knex("idstorage").where("latestid", "=", id).increment("latestid", 1);
        });
    })
    .then(() => {});
});

app.listen(process.env.PORT || 4000);
// app.listen(3000, () => {
//   console.log("Server's running");
// });
