import { SkinModel } from '../models/skin.model';
import { SkinImageModel } from '../models/skinimage.model';
import { UserSkinModel } from '../models/userskin.model';
import { sequelize } from '../models';
import { UserModel } from '../models/user.model'; // 유저 모델도 필요

const Skin = SkinModel(sequelize);
const SkinImage = SkinImageModel(sequelize);
const UserSkin = UserSkinModel(sequelize, Skin, UserModel);  // UserSkin 모델이 User 모델을 참조하므로 User도 import해야 합니다.

// 구매 가능한 스킨 목록 가져오기
export const getPurchasableSkins = async () => {
  try {
    return await Skin.findAll({
      where: { isPurchasable: true },
    });
  } catch (error) {
    throw new Error('스킨 목록을 가져오는 데 실패했습니다.');
  }
};

// 스킨 구매
export const purchaseSkin = async (userId, skinId) => {
  try {
    const skin = await Skin.findByPk(skinId);
    if (!skin || !skin.isPurchasable) {
      throw new Error('구매할 수 없는 스킨입니다.');
    }

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
