const moduleRoute = require("express").Router();
const controller = require("../controllers/headquarter");
const auth = require("../middleware/auth");
const validation = require("../middleware/validation");
const { notesSchema } = require("../validations/notes");

/**
 * method: `POST`
 * 
 * url: `BACKEND_BASE_URL/api/v1/merchant-headquarter`
 */
moduleRoute.route("/create-tenant").post(controller.createHeadquarter);

/**
 * method: `GET`
 * 
 * url: `BACKEND_BASE_URL/api/v1/merchant-headquarter`
 */
moduleRoute.route("/").get([auth], controller.getUsersNotes);

/**
 * method: `GET`
 * 
 * url: `BACKEND_BASE_URL/api/v1/merchant-headquarter/:id`
 */
 moduleRoute.route("/:id").get([auth], controller.getUsersNote);

/**
 * method: `GET`
 * 
 * url: `BACKEND_BASE_URL/api/v1/merchant-headquarter/all`
 */
moduleRoute.route("/all").get([auth], controller.getAllNotes);

/**
 * method: `DELETE`
 * 
 * url: `BACKEND_BASE_URL/api/v1/merchant-headquarter/:id` id : Note id
 */
moduleRoute.route("/:id").delete([auth], controller.deleteNote);

/**
 * method: `PUT`
 * 
 * url: `BACKEND_BASE_URL/api/v1/merchant-headquarter/:id` id : Note id
 */
moduleRoute.route("/:id").put([auth, validation(notesSchema)], controller.editNote);

module.exports = moduleRoute;
