import Sequelize, { DataTypes } from "sequelize";
import { dbConfig } from "../config/dbConfig.js";
import { UserModel } from "./user.js";

const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: 3306,
  }
);

db.User = UserModel(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
