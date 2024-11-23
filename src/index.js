import express from "express";
import db from "./models/index.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 8000;
const sequelize = db.sequelize;
await sequelize.sync();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
