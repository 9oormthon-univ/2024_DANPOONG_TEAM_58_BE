import axios from 'axios';
import qs from 'querystring';
import dotenv from 'dotenv';
const { User } = require('../models/user.model.js');

dotenv.config();

export const getKakaoToken = async (code) => {
  try {
    const response = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      qs.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.REST_API_KEY,
        redirect_uri: process.env.REDIRECT_URI,
        code: code,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;
    console.log('Access Token:', access_token);
    console.log('Refresh Token:', refresh_token);
    console.log('Expires In:', expires_in);

    return { access_token, refresh_token, expires_in };
  } catch (error) {
    console.error(error);
    throw new Error('토큰 발급 에러');
  }
};

export const getUserInfo = async (tokenData)=>{
  try{
    // 액세스 토큰 추가
    const header = {
      Authorization: `Bearer ${tokenData.access_token}`,
    };
    
    const get = await axios.get("https://kapi.kakao.com/v2/user/me", {headers: header})
    const result = get.data

    const userInfo = {
      id: result.id,
      nickname: result.kakao_account.profile.nickname,  // 닉네임
      // profileImage: result.kakao_account.profile.profile_image_url,  // 프로필 사진 URL
    };

    // 데이터베이스에 유저가 존재하는지 확인 후 없으면 추가
    const [user, created] = await User.findOrCreate({
      where: { kakao_id: userInfo.id },
      defaults: {
        email: result.kakao_account.email,
        nickname: userInfo.nickname,
        // profile_image: userInfo.profileImage,
      },
    });

    // 새로 생성된 유저나 기존 유저 정보 반환
    return {
      user: {
        id: user.id,
        nickname: user.nickname,
        profile_image: user.image,
      },
      created,  // created가 true면 새로 생성된 유저, false면 기존 유저
    };
  } catch (error) {
    throw new Error("유저 정보 불러오기 실패");
  }
}