import express from 'express';
import keywordController from '../../controllers/keyword.controller';
import catchAsync from '../../middlewares/catchAsync.middleware';

const { matchingKeywords } = keywordController;
const router = express.Router();

// 키워드 매칭
router.post('/matching', catchAsync(matchingKeywords));

export default router;
