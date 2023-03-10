const express = require("express");
const router = express.Router();
const path = require("path");

// Get the route name from the file name
const routeName = path.basename(__filename, ".js");

// Load the controller with the same name as the route
const Controller = require(`../controllers/${routeName}`);

router.get("/", Controller.index);

module.exports = router;
