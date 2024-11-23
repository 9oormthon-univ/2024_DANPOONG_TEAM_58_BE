export const UserSkinModel = (sequelize, DataTypes, User, Skin) => {
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
