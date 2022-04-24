import db from '../models/index';
// import { AuthorizationError } from '../helpers/errors.helper';

export default {
  find: async (boardId, limit = 20, offset = 0) => {
    const comments = await db.Comments.findAndCountAll({
      attributes: ['id', 'boardId', 'msg', 'owner', 'createdAt', 'updatedAt'],
      include: [
        {
          model: db.SubComments,
          as: 'subComments',
        },
      ],
      distinct: true,
      where: [{ boardId }],
      offset: parseInt(offset, 10),
      limit: parseInt(limit, 10),
      order: [['id', 'DESC']],
    });
    return comments;
  },
  create: async (boardId, msg, owner) => {
    const comments = await db.Comments.create({
      boardId,
      msg,
      owner,
    });
    return comments;
  },
  createSubComments: async (boardId, msg, owner, pcId) => {
    const subComments = await db.SubComments.create({
      msg,
      owner,
      pcId,
    });
    return subComments;
  },
};
