const Joi = require("joi");
const validateRequest = require("../middleware/validate-request");
const config = require("../config/config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserDB = require("../models").User;

function omitHash(user) {
  const { hash, ...userWithoutHash } = user;
  return userWithoutHash;
}

const controller = {
  authenticateSchema: async (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "ro"] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });
    validateRequest(req, next, schema);
  },

  authenticate: async (req, res, next) => {
    const { username, password } = req.body;

    UserDB.scope("withHash")
      .findOne({
        where: { username },
      })
      .then(async (user) => {
        if (!user || !(await bcrypt.compare(password, user.hash))) {
          return res
            .status(400)
            .send({ message: "Username or password is incorrect" });
        }

        const token = jwt.sign({ sub: user.id }, config.secret, {
          expiresIn: "7d",
        });
        res.status(200).json({ ...omitHash(user.get()), token });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Server error" });
      });
  },

  registerSchema: async (req, res, next) => {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      city: Joi.string().required(),
      username: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "ro"] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });
    validateRequest(req, next, schema);
  },

  register: async (req, res, next) => {
    let { username, password } = req.body;
    UserDB.findOne({ where: { username } })
      .then(async (user) => {
        if (user) {
          return res
            .status(400)
            .send({ message: `Username ${username} is already taken` });
        }

        let userToCreate = req.body;
        if (password) {
          userToCreate.hash = await bcrypt.hash(password, 10);
        }

        UserDB.create(userToCreate)
          .then(() => {
            res.status(201).send({ message: "Registration successful!" });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send({ message: "Server error!" });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getAll: async (req, res, next) => {
    UserDB.findAll()
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getCurrent: async (req, res, next) => {
    res.status(200).json(req.user);
  },

  getById: async (req, res, next) => {
    UserDB.findByPk(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Server error!" });
      });
  },

  updateSchema: async (req, res, next) => {
    const schema = Joi.object({
      firstName: Joi.string().empty(""),
      lastName: Joi.string().empty(""),
      city: Joi.string().empty(""),
      username: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "ro"] } })
        .empty(""),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .empty(""),
    });
    validateRequest(req, next, schema);
  },

  update: async (req, res, next) => {
    UserDB.findByPk(req.params.id)
      .then(async (user) => {
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }

        const { username, password, hash } = req.body;
        const usernameChanged = username && user.username !== username;
        if (usernameChanged) {
          UserDB.findOne({ where: { username } })
            .then((user) => {
              if (user) {
                return res
                  .status(400)
                  .send({ message: `Username ${username} is already taken` });
              }
            })
            .catch((err) => {
              console.error(err);
              res.status(500).send({ message: "Server error!" });
            });
        }

        let userToCreate = req.body;
        if (password) {
          userToCreate.hash = await bcrypt.hash(password, 10);
        }

        Object.assign(user, userToCreate);
        await user.save();
        res.status(200).send(omitHash(user.get()));
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Server error!" });
      });
  },

  delete: async (req, res, next) => {
    UserDB.findByPk(req.params.id)
      .then(async (user) => {
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }
        await user.destroy();
        res.status(200).send({ message: "User deleted successfully" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Server error!" });
      });
  },
};

module.exports = controller;
