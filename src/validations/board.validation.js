const Joi = require('joi');

const createBoards = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    contents: Joi.string().required(),
    owner: Joi.string().required(),
    pwd: Joi.string().required(),
  }),
};

const updateBoard = {
  params: Joi.object().keys({
    boardId: Joi.required(),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    contents: Joi.string().required(),
    pwd: Joi.string().required(),
  }),
};

module.exports = {
  createBoards,
  updateBoard,
};
