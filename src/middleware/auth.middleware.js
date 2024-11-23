import * as userServices from "../services/user.service.js";

export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "로그인 후 이용바랍니다." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const userInfo = await userServices.getUserInfoFromToken(token);
    const user = await userServices.getUserInfo(userInfo.id);

    if (!user) {
      return res.status(404).send({ message: "유저를 찾을 수 없습니다." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).send({
      message: "유저 인증 실패",
      error: error.message,
    });
  }
};
