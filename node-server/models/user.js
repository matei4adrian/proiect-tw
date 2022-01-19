module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      city: { type: DataTypes.STRING, allowNull: false },
      username: { type: DataTypes.STRING, allowNull: false },
      hash: { type: DataTypes.STRING, allowNull: false },
    },
    {
      defaultScope: {
        attributes: { exclude: ["hash"] },
      },
      scopes: {
        withHash: { attributes: {} },
      },
    }
  );
};
