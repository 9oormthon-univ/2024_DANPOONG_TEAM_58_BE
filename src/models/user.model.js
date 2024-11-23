import { Model } from "sequelize";

export const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.STRING(20), allowNull: false, unique: true, primaryKey: true },
      password: { type: DataTypes.STRING(20), allowNull: false, unique: true },
      nickname: { type: DataTypes.STRING(20), allowNull: false, unique: true },
      image: { type: DataTypes.TEXT, allowNull: true, unique: false },
    },
    { charset: "utf8", collate: "utf8_general_ci" }
  );
  User.associate = (db) => {};
  return User;
};
