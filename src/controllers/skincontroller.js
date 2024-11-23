import * as skinService from '../services/skin.service';

// 구매 가능한 스킨 목록
export const getPurchasableSkins = async (req, res) => {
  try {
    const skins = await skinService.getPurchasableSkins();
    res.json(skins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 스킨 구매
export const purchaseSkin = async (req, res) => {
  try {
    const { userId, skinId } = req.body;
    const skins = await skinService.purchaseSkin(userId, skinId);
    res.json({ message: '스킨 구매 완료', skins });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 구매한 스킨 목록
export const getPurchasedSkins = async (req, res) => {
  try {
    const { userId } = req.query;
    const skins = await skinService.getPurchasedSkins(userId);
    res.json(skins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 스킨 활성화
export const activateSkin = async (req, res) => {
  try {
    const { userId, skinId } = req.body;
    const activeSkin = await skinService.activateSkin(userId, skinId);
    res.json({ message: '스킨이 활성화되었습니다.', activeSkin });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const UserSkinModel = (sequelize, DataTypes, User, Skin) => {
  const UserSkin = sequelize.define(
    "UserSkin",
    {
      pk: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: User,
          key: "pk",
        },
      },
      pk2: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: Skin,
          key: "pk",
        },
      },
    },
    {
      tableName: "UserSkin",
      timestamps: false,
      primaryKey: false,
    }
  );

  return UserSkin;
};

import { Sequelize } from "sequelize";

export const SkinModel = (sequelize, DataTypes) => {
  const Skin = sequelize.define(
    "Skin",
    {
      pk: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        comment: "UNIQUE",
      },
    },
    {
      tableName: "Skin",
      timestamps: false,
    }
  );

  return Skin;
};

export const SkinImageModel = (sequelize, DataTypes) => {
  const SkinImage = sequelize.define(
    "SkinImage",
    {
      emotion: {
        type: DataTypes.ENUM("happy", "sad", "angry", "neutral"), // Enum 값은 필요에 따라 수정
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "SkinImage",
      timestamps: false,
    }
  );

  return SkinImage;
};
