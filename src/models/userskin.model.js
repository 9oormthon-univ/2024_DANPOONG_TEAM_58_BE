import { Sequelize, DataTypes } from "sequelize";

export const UserSkinModel = (sequelize, User, Skin) => {
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
        defaultValue: 0,  // 0번 스킨 기본값
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