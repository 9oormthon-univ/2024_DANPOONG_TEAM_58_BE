import dotenv from "dotenv";
import { Diary } from "../models/index.js";

dotenv.config();

export const createDiary = async (data) => {
  try {
    const newDiary = await Diary.create({
      ...data,
    });

    return newDiary;
  } catch (error) {
    throw error;
  }
};
