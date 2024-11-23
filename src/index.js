import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import diaryRouter from "./routes/diary.route.js";
import skinRouter from "./routes/skin.route.js";
import { sequelize } from "./models/index.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 8000;

// body 설정
app.use(express.json());

// CORS 설정
app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

(async () => {
  try {
    // 외래 키 체크 비활성화
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true });

    // 모델 동기화
    await sequelize.sync({ alter: true });

    // 외래 키 체크 다시 활성화
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", { raw: true });

    console.log("테이블 동기화 완료");
  } catch (error) {
    console.error("테이블 동기화 중 오류 발생:", error);
  }
})();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRoutes);
app.use("/diaries", diaryRouter);
app.use("/skin", skinRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
