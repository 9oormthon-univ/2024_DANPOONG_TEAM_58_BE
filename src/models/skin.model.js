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
