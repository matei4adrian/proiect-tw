const express = require("express");
const router = express.Router();
const userController = require("../controllers").user;
const experienceController = require("../controllers").experience;
const authorize = require("../middleware/authorize");

router.post(
  "/authenticate",
  userController.authenticateSchema,
  userController.authenticate
);
router.post(
  "/register",
  userController.registerSchema,
  userController.register
);
router.get("/", authorize(), userController.getAll);
router.get("/current", authorize(), userController.getCurrent);
router.get("/:id", authorize(), userController.getById);
router.put(
  "/:id",
  authorize(),
  userController.updateSchema,
  userController.update
);
router.delete("/:id", authorize(), userController.delete);
router.get(
  "/:userId/experiences/:experienceId",
  authorize(),
  experienceController.getExperienceOfUserById
);
router.get(
  "/:userId/experiences",
  authorize(),
  experienceController.getAllExperiencesOfUser
);
router.post(
  "/:userId/experiences",
  authorize(),
  experienceController.addExperienceOfUser
);
router.put(
  "/:userId/experiences/:experienceId",
  authorize(),
  experienceController.updateExperienceOfUser
);
router.delete(
  "/:userId/experiences/:experienceId",
  authorize(),
  experienceController.deleteExperienceOfUser
);

module.exports = router;
