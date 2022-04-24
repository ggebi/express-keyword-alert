const Joi = require('joi');

const createComments = {
  body: Joi.object().keys({
    msg: Joi.string().required(),
    owner: Joi.string().required(),
    boardId: Joi.number(),
    pcId: Joi.number(),
  }),
};

module.exports = {
  createComments,
};
