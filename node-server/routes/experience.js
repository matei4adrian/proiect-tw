const express = require("express");
const router = express.Router();
const experienceController = require("../controllers").experience;
const authorize = require("../middleware/authorize");

router.get(
  "/",
  authorize(),
  experienceController.getAllExperiencesOfAllUsersFiltered
);

module.exports = router;
