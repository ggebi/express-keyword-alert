import express from 'express';
import keywordController from '../../controllers/keyword.controller';
import catchAsync from '../../middlewares/catchAsync.middleware';

const { matchingKeywords } = keywordController;
const router = express.Router();

// 키워드 매칭
router.post('/matching', catchAsync(matchingKeywords));
// 게시글 목록
// router.get('/', catchAsync(findAllBoards));
// 게시글 작성
// router.post('/', catchAsync(createBoards));
// 게시글 수정
// router.patch('/:boardId', catchAsync(modifyBoard));
// 게시글 삭제
// router.delete('/:boardId', catchAsync(deleteBoard));

export default router;
