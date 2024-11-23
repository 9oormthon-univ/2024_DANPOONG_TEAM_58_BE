import { DataTypes } from "sequelize";
import Sequelize from "sequelize";
import { dbConfig } from "../configs/dbConfig.js";
import { UserModel } from "./user.model.js";
import { DiaryModel } from "./dairy.model.js";
import { UserSkinModel } from "./userskin.model.js";
import { SkinModel } from "./skin.model.js";
import { SkinImageModel } from "./skinimage.model.js";

const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: 3306,
  }
);

const User = UserModel(sequelize, DataTypes);
const Skin = SkinModel(sequelize, DataTypes);
const Diary = DiaryModel(sequelize, DataTypes);
const UserSkin = UserSkinModel(sequelize, DataTypes, User, Skin);
const SkinImage = SkinImageModel(sequelize, DataTypes);

// 관계 설정
User.hasMany(UserSkin, { foreignKey: "pk" });
UserSkin.belongsTo(User, { foreignKey: "pk", onDelete: "CASCADE" });

Skin.hasMany(UserSkin, { foreignKey: "pk2" });
UserSkin.belongsTo(Skin, { foreignKey: "pk2", onDelete: "CASCADE" });

Skin.hasMany(SkinImage, { foreignKey: "pk" });
SkinImage.belongsTo(Skin, { foreignKey: "pk", onDelete: "CASCADE" });

export { User, Skin, Diary, UserSkin, SkinImage, sequelize };
