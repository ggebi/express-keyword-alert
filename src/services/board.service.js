import db from '../models/index';
import { AuthorizationError } from '../helpers/errors.helper';

export default {
  find: async (limit = 20, offset = 0) => {
    const boards = await db.Board.findAndCountAll({
      attributes: [
        'id',
        'title',
        'contents',
        'owner',
        'createdAt',
        'updatedAt',
      ],
      offset: parseInt(offset, 10),
      limit: parseInt(limit, 10),
      order: [['id', 'DESC']],
    });
    return boards;
  },
  create: async (title, contents, owner, pwd) => {
    const board = await db.Board.create({
      title,
      contents,
      owner,
      pwd,
    });
    return board;
  },
  update: async (id, title, contents, pwd) => {
    const board = await db.Board.findOne({
      attributes: ['id', 'pwd'],
      where: [{ id }],
    });

    if (await db.Board.comparePassword(pwd, board.pwd)) {
      const updatedBoard = await db.Board.update(
        { title, contents },
        {
          where: [{ id }],
          limit: 1,
        },
      );
      return updatedBoard;
    } else {
      throw AuthorizationError();
    }
  },
  delete: async (id, pwd) => {
    const board = await db.Board.findOne({
      attributes: ['id', 'pwd'],
      where: [{ id }],
    });

    if (await db.Board.comparePassword(pwd, board.pwd)) {
      const deletedCnt = await db.Board.destroy({
        where: [{ id }],
        limit: 1,
      });
      return deletedCnt;
    } else {
      throw AuthorizationError();
    }
  },
};
