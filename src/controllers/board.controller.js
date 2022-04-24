import BoardService from '../services/board.service';
import { ApplicationError } from '../helpers/errors.helper';
import { SendKeywordAlert } from '../services/alert/alert.service';

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: total, rows: boards } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(total / limit);
  return { total, boards, totalPages, currentPage };
};

export default {
  /**
   * 게시글 리스트 조회
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  findAllBoards: async (req, res) => {
    try {
      const { title, owner, page, size } = req.query;
      const { limit, offset } = getPagination(page, size);
      const data = await BoardService.find(title, owner, limit, offset);
      res.status(200).json({
        message: '게시판 리스트 조회 성공',
        data: getPagingData(data, page, limit),
      });
    } catch (error) {
      throw new ApplicationError(500, error);
    }
  },
  /**
   * 게시글 추가
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  createBoards: async (req, res) => {
    const { title, contents, owner, pwd } = req.body;

    try {
      const board = await BoardService.create(title, contents, owner, pwd);

      /**
       * 키워드 알림은 비동기처리
       * 정확한 비동기 설명은 README에 남겨놓겠습니다.
       */
      SendKeywordAlert(contents);

      res.status(200).json({
        message: '게시글 추가 성공',
        data: {
          board: board.dataValues,
        },
      });
    } catch (error) {
      throw new ApplicationError(500, error);
    }
  },
  modifyBoard: async (req, res, next) => {
    const { title, contents, pwd } = req.body;
    const { boardId } = req.params;
    let message = '';

    try {
      const updatedCnt = await BoardService.update(
        boardId,
        title,
        contents,
        pwd,
      );

      if (updatedCnt[0] === 0) {
        message = '게시글 수정 실패';
      } else {
        message = '게시글 수정 성공';
      }

      return res.status(200).json({
        message,
      });
    } catch (error) {
      if (error instanceof ApplicationError) {
        res.status(error.statusCode).json(error.message);
      } else {
        next(error);
      }
    }
  },
  deleteBoard: async (req, res) => {
    const { pwd } = req.body;
    const { boardId } = req.params;
    let message = '';

    try {
      const deletedCnt = await BoardService.delete(boardId, pwd);

      if (deletedCnt === 0) {
        message = '게시글 삭제 실패';
      } else {
        message = '게시글 삭제 성공';
      }

      res.status(200).json({
        message,
      });
    } catch (error) {
      throw new ApplicationError(500, error);
    }
  },
};
