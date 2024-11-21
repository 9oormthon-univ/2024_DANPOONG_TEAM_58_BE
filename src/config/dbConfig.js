import dotenv from "dotenv";
dotenv.config();

export const dbConfig = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: "naran_development",
    dialect: "mysql",
    timezone: "+09:00",
  },
};
