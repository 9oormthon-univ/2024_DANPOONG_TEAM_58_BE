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

    return res.status(200).send({
      message: '토큰 발급 성공',
      data: tokenData,
    });
  } catch (error) {
    return res.status(500).send({
      message: '토큰 발급 실패',
      error: error.message,
    });
  }
};