export const DiaryModel = (sequelize, DataTypes) => {
  const Diary = sequelize.define(
    "Diary",
    {
      question: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      emotion: {
        type: DataTypes.ENUM("happy", "sad", "angry", "neutral"), // Enum 값은 필요에 따라 수정
        allowNull: false,
      },
      writer: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      tableName: "Diary",
      timestamps: true,
    }
  );

  return Diary;
};
