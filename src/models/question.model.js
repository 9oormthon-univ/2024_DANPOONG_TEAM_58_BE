import { Sequelize, DataTypes } from "sequelize";

export const QuestionModel = (sequelize) => {
  const Question = sequelize.define(
    "Question",
    {
      pk: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      answerAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "Question",
      timestamps: false,
    }
  );

  return Question;
};
