// const logger = require("../logs/logger");x
const {
  RECORD_CREATED,
  SERVER_ERROR,
  RECORDS_FOUND,
  RECORD_DELETED,
  RECORD_UPDATED,
} = require("../utils/constants");
const Models = require("../models");
const { sendResponse } = require("../utils/helpers");

/**
 * method : `POST`
 *
 * url : `BACKEND_BASE_URL/api/v1/notes`
 *
 * Takes `title`, `content` in request body and
 * create the note for logged in user
 */
exports.createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const note = await Models.Notes.create({
      title,
      content,
      user: req.user.id,
    });
    res.status(201).json({
      data: note,
      code: 201,
      message: RECORD_CREATED,
    });
  } catch (error) {
    // logger.error("Whooops! This broke with error: ", error);
    console.log(error);
    return res.status(500).json(sendResponse(null, 500, SERVER_ERROR));
  }
};

/**
 * method : `GET`
 *
 * url : `BACKEND_BASE_URL/api/v1/notes`
 *
 * Gives all notes for logged in user
 */
exports.getUsersNotes = async (req, res, next) => {
  try {
    const notes = await Models.Notes.findAll({
      where: { user: req.user.id },
    });
    res.status(200).json({
      data: notes,
      code: 200,
      message: RECORDS_FOUND,
    });
  } catch (error) {
    // logger.error("Whooops! This broke with error: ", error);
    console.log(error);
    return res.status(500).json(sendResponse(null, 500, SERVER_ERROR));
  }
};

/**
 * method : `GET`
 *
 * url : `BACKEND_BASE_URL/api/v1/notes/:id`
 *
 * Gives note with id passed in params
 */
exports.getUsersNote = async (req, res, next) => {
  try {
    const { id } = req.params;

    const note = await Models.Notes.findOne({ where: { id: id } });

    res.status(200).json({
      data: note,
      code: 200,
      message: RECORDS_FOUND,
    });
  } catch (error) {
    // logger.error("Whooops! This broke with error: ", error);
    console.log(error);
    return res.status(500).json(sendResponse(null, 500, SERVER_ERROR));
  }
};

/**
 * method : `GET`
 *
 * url : `BACKEND_BASE_URL/api/v1/notes/all`
 *
 * Gives all notes from all users
 */
exports.getAllNotes = async (req, res, next) => {
  try {
    const notes = await Models.Notes.findAll({
      attributes: { exclude: "user" },
    });
    res.status(200).json({
      data: notes,
      code: 200,
      message: RECORDS_FOUND,
    });
  } catch (error) {
    // logger.error("Whooops! This broke with error: ", error);
    console.log(error);
    return res.status(500).json(sendResponse(null, 500, SERVER_ERROR));
  }
};

/**
 * method : `DELETE`
 *
 * url : `BACKEND_BASE_URL/api/v1/notes/:id` id : noteId
 *
 * Gives all notes from all users
 */
exports.deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Models.Notes.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      data: null,
      code: 200,
      message: RECORD_DELETED,
    });
  } catch (error) {
    // logger.error("Whooops! This broke with error: ", error);
    console.log(error);
    return res.status(500).json(sendResponse(null, 500, SERVER_ERROR));
  }
};

/**
 * method : `PUT`
 *
 * url : `BACKEND_BASE_URL/api/v1/notes/:id` id : noteId
 *
 * Takes `title` & `content` in request body and edits the
 * note with passed `id`
 */
exports.editNote = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Models.Notes.update(
      { ...req.body },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      data: null,
      code: 200,
      message: RECORD_UPDATED,
    });
  } catch (error) {
    // logger.error("Whooops! This broke with error: ", error);
    console.log(error);
    return res.status(500).json(sendResponse(null, 500, SERVER_ERROR));
  }
};
