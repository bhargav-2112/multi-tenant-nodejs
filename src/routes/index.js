const express = require("express");
const fs = require("fs");
const { tenant } = require("../middleware/tenant");
const db = require("../models");
const moduleRoute = express.Router();

/**
 * Exports all route files automatically.
 * 
 * Code below takes file from `/routes` folder and 
 * include in root express router automatically.
 * 
 * If you create route file with the name of `notes.js`
 * `http://localhost:3001/api/v1/notes` will be registered automatically
 */
module.exports = fs.readdirSync(__dirname + "/").forEach(function (file) {
  if (file !== "index.js" && file.substr(-3) == ".js") {
    const routeName = file.replace(".js", "");
    moduleRoute.use("/" + routeName, require("./" + routeName),(req, res, next) => tenant(req, res, next, db));
  }
});

module.exports = moduleRoute;
