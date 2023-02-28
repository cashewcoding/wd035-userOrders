const express = require("express");
require("dotenv/config");
const app = express();
const PORT = process.env.PORT || 8000;
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.ELEPHANT_SQL_CONNECTION_STRING,
});
const cors = require("cors");

// BODY PARSER
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("<h1>User orders</h1>");
});

// API
// GET ALL USERS
app.get("/api/users", (req, res) => {
  pool
    .query("SELECT * FROM users;")
    .then((data) => {
      console.log(data);
      res.json(data.rows);
    })
    .catch((e) => res.status(500).json({ message: e.message }));
});

// GET A SPECIFIC USER WITH ID
app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  pool
    .query("SELECT * FROM users WHERE id=$1;", [id])
    .then((data) => {
      console.log(data);
      if (data.rowCount === 0) {
        res.status(404).json({ message: "User not found" });
      }
      res.json(data.rows[0]);
    })
    .catch((e) => res.status(500).json({ message: e.message }));
});

// ADD USER
app.post("/api/users", (req, res) => {
  const { title, author, year } = req.body; // form data from body
  pool
    .query(
      "INSERT INTO users (title,author,year) VALUES ($1,$2,$3) RETURNING *;",
      [title, author, year]
    )
    .then((data) => {
      console.log(data);
      res.status(201).json(data.rows[0]);
    })
    .catch((e) => res.status(500).json({ message: e.message }));
});

// UPDATE USER
app.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const { title, author, year } = req.body; // form data from body
  pool
    .query(
      "UPDATE users SET title=$1,author=$2,year=$3 WHERE id=$4 RETURNING *;",
      [title, author, year, id]
    )
    .then((data) => {
      console.log(data);
      res.status(201).json(data.rows[0]);
    })
    .catch((e) => res.status(500).json({ message: e.message }));
});

// DELETE USER
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  pool
    .query("DELETE FROM users WHERE id=$1 RETURNING *;", [id])
    .then((data) => {
      console.log(data);
      res.json(data.rows[0]);
    })
    .catch((e) => res.status(500).json({ message: e.message }));
});

// GET ALL ORDERS
app.get("/api/orders", (req, res) => {
  pool
    .query("SELECT * FROM orders;")
    .then((data) => {
      console.log(data);
      res.json(data.rows);
    })
    .catch((e) => res.status(500).json({ message: e.message }));
});

// GET A SPECIFIC ORDER WITH ID
app.get("/api/orders/:id", (req, res) => {
  const id = req.params.id;
  pool
    .query("SELECT * FROM orders WHERE id=$1;", [id])
    .then((data) => {
      console.log(data);
      if (data.rowCount === 0) {
        res.status(404).json({ message: "User not found" });
      }
      res.json(data.rows[0]);
    })
    .catch((e) => res.status(500).json({ message: e.message }));
});

// ADD ORDER
app.post("/api/orders", (req, res) => {
  const { title, author, year } = req.body; // form data from body
  pool
    .query(
      "INSERT INTO orders (title,author,year) VALUES ($1,$2,$3) RETURNING *;",
      [title, author, year]
    )
    .then((data) => {
      console.log(data);
      res.status(201).json(data.rows[0]);
    })
    .catch((e) => res.status(500).json({ message: e.message }));
});

// UPDATE ORDER
app.put("/api/orders/:id", (req, res) => {
  const id = req.params.id;
  const { title, author, year } = req.body; // form data from body
  pool
    .query(
      "UPDATE orders SET title=$1,author=$2,year=$3 WHERE id=$4 RETURNING *;",
      [title, author, year, id]
    )
    .then((data) => {
      console.log(data);
      res.status(201).json(data.rows[0]);
    })
    .catch((e) => res.status(500).json({ message: e.message }));
});

// DELETE ORDER
app.delete("/api/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  pool
    .query("DELETE FROM orders WHERE id=$1 RETURNING *;", [id])
    .then((data) => {
      console.log(data);
      res.json(data.rows[0]);
    })
    .catch((e) => res.status(500).json({ message: e.message }));
});

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
