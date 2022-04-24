import express from 'express';
import boardController from '../../controllers/board.controller';
import catchAsync from '../../middlewares/catchAsync.middleware';

const { findAllBoards, createBoards, modifyBoard, deleteBoard } =
  boardController;
const router = express.Router();

// 게시글 목록
router.get('/', catchAsync(findAllBoards));
// 게시글 작성
router.post('/', catchAsync(createBoards));
// 게시글 수정
router.patch('/:boardId', catchAsync(modifyBoard));
// 게시글 삭제
router.delete('/:boardId', catchAsync(deleteBoard));

export default router;
