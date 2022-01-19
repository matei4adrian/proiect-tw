const jwt = require("express-jwt");
const { secret } = require("../config/config.json");
const UserDB = require("../models").User;

module.exports = authorize;

function authorize() {
  return [
    jwt({ secret, algorithms: ["HS256"] }),

    async (req, res, next) => {
      UserDB.findByPk(req.user.sub)
        .then((user) => {
          if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
          }

          req.user = user.get();
          next();
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send({ message: "Server error" });
        });
    },
  ];
}
