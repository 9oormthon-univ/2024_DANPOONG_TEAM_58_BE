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

export const findDiaryByWriterId = async (userId) => {
  try {
    const Diaries = await Diary.findAll({ where: { writer: userId } });
    return Diaries;
  } catch (error) {
    throw error;
  }
};
