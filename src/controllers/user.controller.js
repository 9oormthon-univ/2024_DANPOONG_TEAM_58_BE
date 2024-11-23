import * as userServices from '../services/user.servie.js';

// 카카오 로그인 페이지로 리디렉션하는 함수
export const kakaoLogin = (req, res) => {
  const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REST_API_KEY}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&response_type=code`;
  res.redirect(kakaoAuthURL);
};

// 카카오 인증 후 콜백을 처리하는 함수
export const kakaoCallback = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send({ message: '카카오 인증코드가 없습니다.' });
  }

  try {
    const tokenData = await userServices.getKakaoToken(code);
    localStorage.setItem('access_token', accessToken); // 로컬 스토리지에 저장
    const { user, created } = await userServices.addUser(tokenData);

    return res.status(201).send({
      message: created ? '새로운 유저가 등록되었습니다.' : '로그인 성공.',
      token: tokenData,
      user: {
        id: user.id,
        nickname: user.nickname,
        profile_image: user.profile_image,
      },
    });
  } catch (error) {
    return res.status(400).send({
      message: '로그인 실패',
      error: error.message,
    });
  }
};

// 유저별 정보 조회
export const getUser = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).send({ message: '토큰이 존재하지 않습니다' });
  }

  // 액세스 토큰 추출
  const token = authHeader.split(' ')[1];

  try {
    // 카카오 API에서 유저 정보 가져오기
    const userInfo = await userServices.getUserInfoFromToken(token);

    // 데이터베이스에서 유저 조회
    const user = await userServices.getUserInfo(userInfo.id);

    return res.status(200).send({
      message: '유저 조회 성공',
      user: user,
    });
  } catch (error) {
    return res.status(400).send({
      message: '유저 조회 실패',
      error: error.message,
    });
  }
}

export const setSkin = async (req, res) => {
  const authHeader = req.headers.authorization;
  const { skinId } = req.body;
  if (!skinId) {
    return res.status(400).send({ message: '스킨 ID가 필요합니다.' });
  }

  if (!authHeader) {
    return res.status(400).send({ message: '토큰이 존재하지 않습니다' });
  }

  // 액세스 토큰 추출
  const token = authHeader.split(' ')[1];

  try {
    // 카카오 API에서 유저 정보 가져오기
    const userInfo = await userServices.getUserInfoFromToken(token);

    // 데이터베이스에서 유저 스킨 변경
    const user = await userServices.setUserSkin(userInfo.id, skinId);

    return res.status(200).send({
      message: '유저 스킨 변경 성공',
      user: user,
    });
  } catch (error) {
    return res.status(400).send({
      message: '유저 스킨 조회 실패',
      error: error.message,
    });
  }
}