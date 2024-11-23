import { Sequelize } from "sequelize";

export const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      pk: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      kakao_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        comment: "카카오 아이디 (Unique)",
      },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      reward: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0,
      },
    },
    {
      tableName: "User",
      timestamps: false,
    }
  );

  return User;
};
