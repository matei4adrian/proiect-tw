module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Experience", {
    author: { type: DataTypes.STRING, allowNull: false },
    startPoint: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50],
      },
    },
    endPoint: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50],
      },
    },
    vehicleType: { type: DataTypes.STRING, allowNull: false },
    departureHour: { type: DataTypes.STRING, allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false },
    agglomeration: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["Low", "Medium", "High"],
    },
    observations: { type: DataTypes.STRING, allowNull: false },
    satisfactionLevel: { type: DataTypes.INTEGER, allowNull: false },
  });
};
