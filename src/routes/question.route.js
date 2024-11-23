import express from "express";
import * as questionControllers from "../controllers/question.controller.js";

const questionRouter = express.Router();

questionRouter.get("/", questionControllers.getQuestions);

export default questionRouter;
