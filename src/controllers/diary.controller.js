import { getUserInfo } from "../services/user.service.js";
import {
  createDiary,
  findDiaryByDate,
  findDiaryByWriterId,
} from "../services/diary.service.js";

export const writeDiary = async (req, res) => {
  const data = req.body;

  if (!data) {
    return res.status(400).send({ message: "일기 정보가 없습니다." });
  }

  try {
    // TODO 로그인 처리 후 일기 작성자 처리하기
    // const tokenData = localStorage.getItem("access_token");
    // const { id } = await getUserInfo(tokenData).user;
    // console.log(id);
    const newDiary = await createDiary(data);
    return res.status(201).send({
      message: "일기 작성에 성공했습니다.",
      newDiary,
    });
  } catch (error) {
    return res.status(500).send({
      message: "일기를 작성하지 못했습니다.",
      error: error.message,
    });
  }
};

export const getDiary = async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).send({ message: "사용자 id를 입력해주세요." });
  }
  try {
    const result = await findDiaryByWriterId(userId);

    return res
      .status(200)
      .send({ message: `${userId}님의 일기 조회 결과입니다.`, data: result });
  } catch (error) {
    return res.status(500).send({ message: "일기 조회에 실패하였습니다." });
  }
};

export const getDiaryByDate = async (req, res) => {
  const { userId, year, month, day } = req.query;

  if (!userId) {
    return res.status(400).send({ message: "사용자 id를 입력해주세요." });
  }
  const date = new Date(year, month - 1, day);

  try {
    const result = await findDiaryByDate(userId, date);

    return res.status(200).send({
      message: `${userId}님의 ${year}-${month}-${day} 일자 일기 조회 결과입니다.`,
      data: result,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "일기 조회에 실패했습니다.", error: error.message });
  }
};
