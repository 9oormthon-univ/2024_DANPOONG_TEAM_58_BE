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

  // 번호(pk)로 Skin을 찾는 방법
  Skin.findByPk = async (pk) => {
    return await Skin.findOne({ where: { pk } });
  };

  return Skin;
};
