import express from 'express';
import cors from 'cors';
import userRoutes from "./routes/user.route.js";
import db from "./models/index.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 8000;

// CORS 설정
app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

const sequelize = db.sequelize;
sequelize.sync();


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});