import { findQuestionBeforeOrEqualToYesterday } from "../services/question.service.js";

export const getQuestions = async (req, res) => {
  try {
    const result = await findQuestionBeforeOrEqualToYesterday(new Date());

    res
      .status(200)
      .send({ message: "현재 답변할 수 있는 질문입니다.", data: result });
  } catch (error) {
    res.status(400).send({ message: "질문을 찾을 수 없습니다." });
  }
};
