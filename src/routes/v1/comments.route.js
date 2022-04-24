import express from 'express';
import commentsController from '../../controllers/comments.controller';
import catchAsync from '../../middlewares/catchAsync.middleware';
import commentsValidation from '../../validations/comments.validation';
import validate from '../../middlewares/validate.middleware';

const { createComments, findAllComments } = commentsController;
const router = express.Router();

// 댓글 목록
router.get('/', catchAsync(findAllComments));
// 댓글 작성
router.post(
  '/',
  validate(commentsValidation.createComments),
  catchAsync(createComments),
);

export default router;
