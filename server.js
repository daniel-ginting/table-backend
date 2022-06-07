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

app.get("/", (req, res) => {
  knex
  .select("*")
  .from("students")
  .then((res2) => {
    res.send(res2);
  });
  
});


app.listen(process.env.PORT || 4000);
