const express = require("express");
const connection = require("./models").connection;
const mysql = require("mysql2/promise");
const config = require("./config/config.json");
const router = require("./routes");
const app = express();
const cors = require("cors");

let serverPort = 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api", router);

const { database, host, port, user, password } = config.database;
app.get("/reset", async (req, res) => {
  const connect = await mysql
    .createConnection({
      host,
      port,
      user,
      password,
    })
    .catch((err) => {
      console.error(err);
    });
  await connect.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  connection
    .sync({ force: true })
    .then(() => {
      res.status(201).send({ message: "Database reset" });
    })
    .catch(() => {
      res.status(500).send({ message: "Database reset failed" });
    });
});

app.use("/*", (req, res) => {
  res.status(200).send("The application is running!");
});

app.listen(serverPort, () => {
  console.log("Server is running on port " + serverPort);
});
