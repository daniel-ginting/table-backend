const express = require("express");
const knex = require("knex")({
  client: "pg",
  connection: {
    // host: "127.0.0.1",
    // port: 5432,
    // user: "danielginting",
    // password: "3232",
    // database: "demo",
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
const cors = require("cors");

const app = express();

// This is the authentication code :)
const authCode = "wedfghj76rj76t";

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Please use other URL parameter");
});

// Getting students
app.post("/students", (req, res) => {
  console.log('ok')
  // Authentication
  if (req.body.code === authCode) {
    // Grab students
    knex
      .select("*")
      .from("students")
      .then((res2) => {
        res.json(res2);
      });
  } else {
    res.status(403).json("Don't MESS AROUND!!! You are UNAUTHORIZED!!!!");
  }
});

// Adding or inserting student
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
          knex("idstorage")
            .where("latestid", "=", id)
            .increment("latestid", 1)
            .returning("latestid")
            .then(() => res.json("success adding student"));
        });
    });
});

app.delete("/delete-student", (req, res) => {
  // Delete student
  knex("students")
    .where("id", req.body.id)
    .del()
    .then(() => res.json(`student deleted`));
});

app.listen(process.env.PORT || 4000);
// app.listen(3000, () => {
//   console.log("Server's running");
// });
