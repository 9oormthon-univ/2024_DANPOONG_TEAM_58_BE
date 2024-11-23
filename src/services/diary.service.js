import dotenv from "dotenv";
import { Diary } from "../models/index.js";
import { Op } from "sequelize";

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

export const findDiaryByDate = async (userId, date) => {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const Diaries = await Diary.findAll({
      where: {
        writer: userId,
        createdAt: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });

    console.log(Diaries);
    return Diaries;
  } catch (error) {
    throw error;
  }
};

export const patchDiary = async (diaryId, data) => {
  try {
    const diary = await Diary.findByPk(diaryId);
    if (diary) {
      diary.content = data.content || diary.content;
      diary.emotion = data.emotion || diary.emotion;
      await diary.save();
      return diary;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
