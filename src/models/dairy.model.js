import { Sequelize, DataTypes } from "sequelize";

export const DiaryModel = (sequelize) => {
  const Diary = sequelize.define(
    "Diary",
    {
      question: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      emotion: {
        type: DataTypes.ENUM("happy", "sad", "angry", "neutral"), // Enum 값은 필요에 따라 수정
        allowNull: true,
      },
      writer: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      tableName: "Diary",
      timestamps: true,
    }
  );

  return Diary;
};
