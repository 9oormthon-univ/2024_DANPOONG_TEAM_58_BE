import { Op } from "sequelize";
import { Question } from "../models/index.js";

// 하루를 빼는 함수
const subtractOneDay = (date) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1); // 하루를 빼기
  newDate.setHours(0, 0, 0, 0); // 시, 분, 초를 0으로 설정
  return newDate;
};

export const findQuestionBeforeOrEqualToYesterday = async (date) => {
  try {
    const yesterday = subtractOneDay(date); // 하루를 뺀 날짜 계산
    console.log(yesterday);
    const questions = await Question.findAll({
      where: {
        answerAt: {
          [Op.lte]: yesterday, // 하루를 뺀 날짜와 비교
        },
      },
      order: [
        ['answerAt', 'ASC'], // answerAt을 기준으로 오름차순 정렬
      ],
    });

    return questions;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};