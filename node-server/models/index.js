const Sequelize = require("sequelize");
const db = require("../config/db");
const UserModel = require("./user");
const ExperienceModel = require("./experience");

const User = UserModel(db, Sequelize);
const Experience = ExperienceModel(db, Sequelize);

User.hasMany(Experience);
Experience.belongsTo(User);

module.exports = {
  User,
  Experience,
  connection: db,
};
