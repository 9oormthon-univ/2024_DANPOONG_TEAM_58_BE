import { getUserInfo } from "../services/user.servie.js";
import { createDiary } from "../services/diary.service.js";

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
