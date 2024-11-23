import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import diaryRouter from "./routes/diary.route.js";
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
  await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true }); // 외래 키 체크 비활성화

  await sequelize.sync({ force: true }); // 모든 테이블 삭제 및 재생성

  await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", { raw: true }); // 외래 키 체크 다시 활성화
  console.log("모든 테이블이 재생성되었습니다!");
})();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRoutes);
app.use("/diaries", diaryRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
