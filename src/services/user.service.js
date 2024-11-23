import axios from "axios";
import qs from "querystring";
import dotenv from "dotenv";
import { User, Skin, UserSkin } from "../models/index.js";

dotenv.config();

export const getKakaoToken = async (code) => {
  try {
    const response = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      qs.stringify({
        grant_type: "authorization_code",
        client_id: process.env.REST_API_KEY,
        redirect_uri: process.env.REDIRECT_URI,
        code: code,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;
    console.log("Access Token:", access_token);
    console.log("Refresh Token:", refresh_token);
    console.log("Expires In:", expires_in);

    return { access_token, refresh_token, expires_in };
  } catch (error) {
    console.error(error);
    throw new Error("토큰 발급 에러");
  }
};

export const addUser = async (tokenData) => {
  try {
    // 액세스 토큰 추가
    const header = {
      Authorization: `Bearer ${tokenData.access_token}`,
    };

    const get = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: header,
    });
    const result = get.data;

    const userInfo = {
      id: result.id,
      nickname: result.kakao_account.profile.nickname, // 닉네임
      // profileImage: result.kakao_account.profile.profile_image_url,  // 프로필 사진 URL
    };
    console.log(userInfo);

    // 데이터베이스에 유저가 존재하는지 확인 후 없으면 추가
    const [user, created] = await User.findOrCreate({
      where: { kakao_id: userInfo.id },
      defaults: {
        kakao_id: userInfo.id,
        email: result.kakao_account.email,
        nickname: userInfo.nickname,
        // profile_image: userInfo.profileImage,
        reward: 0,
      },
    });

    console.log(user);
    console.log(created);

    // 새로 생성된 유저나 기존 유저 정보 반환
    return {
      user: {
        id: user.pk,
        nickname: user.nickname,
        profile_image: user.image,
      },
      created, // created가 true면 새로 생성된 유저, false면 기존 유저
    };
  } catch (error) {
    throw new Error("유저 정보 불러오기 실패");
  }
};

export const getUserInfoFromToken = async (accessToken) => {
  try {
    const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = response.data;

    return {
      id: data.id,
      email: data.kakao_account.email,
      nickname: data.kakao_account.profile.nickname,
      profile_image: data.kakao_account.profile.profile_image_url,
    };
  } catch (error) {
    console.error("카카오 유저 정보 조회 실패:", error);
    throw new Error("카카오 유저 정보 조회 실패");
  }
};

export const getUserInfo = async (userId) => {
  try {
    // 유저 조회
    const user = await User.findOne({
      where: { kakao_id: userId },
    });

    // 유저가 존재하지 않을 경우 에러 처리
    if (!user) {
      throw new Error("유저를 찾을 수 없습니다.");
    }

    return user;
  } catch (error) {
    throw new Error("유저 정보 조회 실패");
  }
};

export const setUserSkin = async (userId, newSkinId) => {
  try {
    // 유저 조회
    const user = await User.findOne({
      where: { kakao_id: userId },
    });

    // 유저가 존재하지 않을 경우 에러 처리
    if (!user) {
      throw new Error("유저를 찾을 수 없습니다.");
    }

    // 스킨 조회
    const skin = await Skin.findOne({
      where: { pk: newSkinId },
    });

    if (!skin) {
      throw new Error("스킨을 찾을 수 없습니다.");
    }

    // 해당 유저의 스킨 변경
    await UserSkin.destroy({
      where: { pk: user.pk },
    });

    // 새로운 스킨과 관계 설정
    const updatedSkin = await UserSkin.create({
      pk: user.pk,
      pk2: newSkin.pk,
    });

    return {
      message: "스킨 변경 성공",
      userId: userId,
      skinId: newSkinId,
      updatedSkin,
    };
  } catch (error) {
    throw new Error("스킨 변경 실패");
  }
};

export const modifyUserReward = async (userId) => {
  try {
    const user = await User.findOne({ where: { pk: userId } });
    user.reward += 10;
    await user.save();
  } catch (error) {
    throw error;
  }
};
