import express from "express";
import * as diaryControllers from "../controllers/diary.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";

const diaryRouter = express.Router();

diaryRouter.post("/", authenticateUser, diaryControllers.writeDiary);
diaryRouter.get("/my", authenticateUser, diaryControllers.getDiary);
diaryRouter.get("/", authenticateUser, diaryControllers.getDiaryByDate);
diaryRouter.patch("/:diaryId", authenticateUser, diaryControllers.editDiary);

export default diaryRouter;
