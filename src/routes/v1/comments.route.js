import express from 'express';
import commentsController from '../../controllers/comments.controller';
import catchAsync from '../../middlewares/catchAsync.middleware';

const { createComments, findAllComments } = commentsController;
const router = express.Router();

// 게시글 목록
router.get('/', catchAsync(findAllComments));
// 게시글 작성
router.post('/', catchAsync(createComments));
// 게시글 수정
// router.patch('/:boardId', catchAsync(modifyBoard));
// 게시글 삭제
// router.delete('/:boardId', catchAsync(deleteBoard));

export default router;
