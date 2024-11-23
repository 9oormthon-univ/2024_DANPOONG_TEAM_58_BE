import {
  createDiary,
  findDiaryByDate,
  findDiaryByWriterId,
  patchDiary,
} from "../services/diary.service.js";

export const writeDiary = async (req, res) => {
  const data = req.body;
  data.writer = req.user.pk;

  try {
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
  try {
    const result = await findDiaryByWriterId(req.user.pk);
    return res
      .status(200)
      .send({ message: `${req.user.nickname}님의 일기 조회 결과입니다.`, data: result });
  } catch (error) {
    return res.status(500).send({ message: "일기 조회에 실패하였습니다." });
  }
};

export const getDiaryByDate = async (req, res) => {
  const { year, month, day } = req.query;

  try {
    const date = new Date(year, month - 1, day);
    const result = await findDiaryByDate(req.user.pk, date);

    return res.status(200).send({
      message: `${req.user.nickname}님의 ${year}-${month}-${day} 일자 일기 조회 결과입니다.`,
      data: result,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "일기 조회에 실패했습니다.", error: error.message });
  }
};

export const editDiary = async (req, res) => {
  const { diaryId } = req.params;
  const data = req.body;

  try {
    const result = await patchDiary(diaryId, data);
    if (result == null) {
      res.status(404).send({ message: "일기를 찾을 수 없습니다." });
    } else {
      res
        .status(201)
        .send({ message: "일기 수정에 성공했습니다.", data: result });
    }
  } catch {
    res.status(500).send({ message: "일기 수정에 실패했습니다." });
  }
};
