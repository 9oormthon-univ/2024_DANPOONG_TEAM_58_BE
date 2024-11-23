import { SkinModel } from '../models/skin.model.js';
import { SkinImageModel } from '../models/skinimage.model.js';
import { UserSkinModel } from '../models/userskin.model.js';
import { sequelize } from '../models/index.js';
import { UserModel } from '../models/user.model.js';

const Skin = SkinModel(sequelize);
const SkinImage = SkinImageModel(sequelize);
const User = UserModel(sequelize); // User 모델을 가져옵니다.
const UserSkin = UserSkinModel(sequelize, Skin, User);  // UserSkin 모델을 User 모델을 참조하도록 설정

// 구매 가능한 스킨 목록 가져오기
export const getPurchasableSkins = async () => {
  try {
    return await Skin.findAll();
  } catch (error) {
    throw new Error('스킨 목록을 가져오는 데 실패했습니다.');
  }
};

// 리워드 차감
export const modifyUserReward = async (userId, skinPrice) => {
  try {
    const user = await User.findOne({ where: { pk: userId } });
    user.reward -= skinPrice; // skinPrice만큼 리워드를 차감
    if (user.reward < 0) {
      throw new Error('리워드가 부족합니다.');
    }
    await user.save();
  } catch (error) {
    throw error;
  }
};

// 스킨 구매
export const purchaseSkin = async (userId, skinId) => {
  try {
    const skin = await Skin.findByPk(skinId);
    if (!skin || !skin.isPurchasable) {
      throw new Error('구매할 수 없는 스킨입니다.');
    }

    // skinPrice 조건에 따른 차감액 설정
    let skinPrice = 0;
    if (skin.defaultValue === 1 || skin.defaultValue === 2) {
      skinPrice = 50; // defaultValue가 1 또는 2일 때 50 차감
    } else if (skin.defaultValue === 3) {
      skinPrice = 100; // defaultValue가 3일 때 100 차감
    }

    // 리워드 차감 함수 호출
    await modifyUserReward(userId, skinPrice);

    let userSkin = await UserSkin.findOne({ where: { pk: userId, pk2: skinId } });
    if (!userSkin) {
      userSkin = await UserSkin.create({ pk: userId, pk2: skinId });
    } else {
      throw new Error('이미 구매한 스킨입니다.');
    }

    return userSkin;
  } catch (error) {
    throw new Error(error.message);
  }
};

// 구매한 스킨 목록
export const getPurchasedSkins = async (userId) => {
  try {
    const userSkins = await UserSkin.findAll({
      where: { pk: userId },
      include: { model: Skin, as: 'skins' }, // UserSkin에서 연관된 스킨을 가져옵니다.
    });

    if (!userSkins || userSkins.length === 0) {
      throw new Error('구매한 스킨이 없습니다.');
    }

    return userSkins.map(userSkin => userSkin.skins); // userSkin에서 연관된 스킨 리스트를 반환합니다.
  } catch (error) {
    throw new Error(error.message);
  }
};

// 스킨 활성화
export const activateSkin = async (userId, skinId) => {
  try {
    const userSkin = await UserSkin.findOne({ where: { pk: userId, pk2: skinId } });
    if (!userSkin) {
      throw new Error('구매하지 않은 스킨입니다.');
    }

    userSkin.activeSkin = skinId; // Active skin 설정
    await userSkin.save();

    return userSkin.activeSkin;
  } catch (error) {
    throw new Error(error.message);
  }
};

// 스킨 이미지 정보 조회
export const getSkinImages = async (skinId) => {
  try {
    const images = await SkinImage.findAll({ where: { skinId } });
    return images;
  } catch (error) {
    throw new Error('스킨 이미지 조회에 실패했습니다.');
  }
};
