import Sequelize, { DataTypes } from "sequelize";
import { dbConfig } from "../config/dbConfig.js";

const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: 3306,
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
