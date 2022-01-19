const ExperienceDB = require("../models").Experience;
const UserDB = require("../models").User;

const controller = {
  getAllExperiencesOfAllUsersFiltered: async (req, res) => {
    const obj = {};
    if (req.query.startPoint || req.query.vehicleType || req.query.endPoint) {
      obj.where = {};
    }
    if (req.query.startPoint) {
      obj.where.startPoint = req.query.startPoint;
    }
    if (req.query.vehicleType) {
      obj.where.vehicleType = req.query.vehicleType;
    }
    if (req.query.endPoint) {
      obj.where.endPoint = req.query.endPoint;
    }

    ExperienceDB.findAll(obj)
      .then((experiences) => {
        res.status(200).send(experiences);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getExperienceOfUserById: async (req, res) => {
    UserDB.findByPk(req.params.userId, { include: [ExperienceDB] })
      .then((user) => {
        if (user) {
          user
            .getExperiences({ where: { id: req.params.experienceId } })
            .then((experiences) => {
              const experience = experiences.shift();
              if (experience) {
                res.status(200).send(experience);
              } else {
                res.status(404).send({ message: "Experience not found!" });
              }
            })
            .catch((err) => {
              console.error(err);
              res.status(500).send({ message: "Server error!" });
            });
        } else {
          res.status(404).send({ message: "User not found!" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Server error!" });
      });
  },
  getAllExperiencesOfUser: async (req, res) => {
    UserDB.findByPk(req.params.userId, { include: [ExperienceDB] })
      .then((user) => {
        if (user) {
          res.status(200).send(user.Experiences);
        } else {
          res.status(404).send({ message: "User not found!" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Server error!" });
      });
  },
  addExperienceOfUser: async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ message: "Empty body!" });
    } else if (
      Object.keys(req.body).length + 4 !==
      Object.keys(ExperienceDB.rawAttributes).length
    ) {
      res.status(400).json({ message: "Malformed request!" });
    } else {
      UserDB.findByPk(req.params.userId)
        .then((user) => {
          if (user) {
            user
              .createExperience(req.body)
              .then((experience) => {
                res.status(201).send(experience);
              })
              .catch((err) => {
                console.error(err);
                res.status(500).send({ message: "Server error!" });
              });
          } else {
            res.status(404).send({ message: "User not found!" });
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send({ message: "Server error!" });
        });
    }
  },
  updateExperienceOfUser: async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ message: "Empty body!" });
    } else {
      UserDB.findByPk(req.params.userId)
        .then((user) => {
          if (user) {
            user
              .getExperiences({ where: { id: req.params.experienceId } })
              .then(async (experiences) => {
                const experience = experiences.shift();
                if (experience) {
                  Object.assign(experience, req.body);
                  await experience.save();
                  res.status(202).send({ message: "Experience updated!" });
                } else {
                  res.status(404).send({ message: "Experience not found!" });
                }
              })
              .catch((err) => {
                console.error(err);
                res.status(500).send({ message: "Server error!" });
              });
          } else {
            res.status(404).send({ message: "User not found!" });
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send({ message: "Server error!" });
        });
    }
  },
  deleteExperienceOfUser: async (req, res) => {
    UserDB.findByPk(req.params.userId)
      .then((user) => {
        if (user) {
          user
            .getExperiences({ where: { id: req.params.experienceId } })
            .then(async (experiences) => {
              const experience = experiences.shift();
              if (experience) {
                await experience.destroy();
                res.status(202).send({ message: "Experience deleted!" });
              } else {
                res.status(404).send({ message: "Experience not found!" });
              }
            })
            .catch((err) => {
              console.error(err);
              res.status(500).send({ message: "Server error!" });
            });
        } else {
          res.status(404).send({ message: "User not found!" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "Server error!" });
      });
  },
};

module.exports = controller;
