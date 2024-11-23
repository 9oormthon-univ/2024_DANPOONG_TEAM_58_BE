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
