const moduleRoute = require("express").Router();
const controller = require("../controllers/notes");
const auth = require("../middleware/auth");
const validation = require("../middleware/validation");
const { notesSchema } = require("../validations/notes");

/**
 * method: `POST`
 * 
 * url: `BACKEND_BASE_URL/api/v1/notes`
 */
moduleRoute.route("/").post([auth, validation(notesSchema)], controller.createNote);

/**
 * method: `GET`
 * 
 * url: `BACKEND_BASE_URL/api/v1/notes`
 */
moduleRoute.route("/").get([auth], controller.getUsersNotes);

/**
 * method: `GET`
 * 
 * url: `BACKEND_BASE_URL/api/v1/notes/:id`
 */
 moduleRoute.route("/:id").get([auth], controller.getUsersNote);

/**
 * method: `GET`
 * 
 * url: `BACKEND_BASE_URL/api/v1/notes/all`
 */
moduleRoute.route("/all").get([auth], controller.getAllNotes);

/**
 * method: `DELETE`
 * 
 * url: `BACKEND_BASE_URL/api/v1/notes/:id` id : Note id
 */
moduleRoute.route("/:id").delete([auth], controller.deleteNote);

/**
 * method: `PUT`
 * 
 * url: `BACKEND_BASE_URL/api/v1/notes/:id` id : Note id
 */
moduleRoute.route("/:id").put([auth, validation(notesSchema)], controller.editNote);

module.exports = moduleRoute;
