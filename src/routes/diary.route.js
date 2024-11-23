import express from "express";
import * as diaryControllers from "../controllers/diary.controller.js";

const diaryRouter = express.Router();

diaryRouter.post('/', diaryControllers.writeDiary);

export default diaryRouter;
