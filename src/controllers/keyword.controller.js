import KeywordService from '../services/keyword.service';
// import { validateSchema } from '../services/joi/joi.service';
import {
  ApplicationError,
  // NotFoundError,
  // AuthenticationError,
} from '../helpers/errors.helper';

export default {
  /**
   * 키워드알림 매칭 후 알림 발송
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  matchingKeywords: async (req, res, next) => {
    const { msg } = req.body;

    console.log('msg:', msg);

    try {
      // 특수문자 제거, 메세지 파싱
      // eslint-disable-next-line no-useless-escape
      const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
      const words = msg.replace(reg, '').split(' ');
      const set = new Set(words.sort());
      const uniqueWords = [...set];

      // 키워드 검색
      const matchedKeywords = await KeywordService.matching(uniqueWords);

      /**
       * 키워드 알림 전송
       * TODO: 키워드 아이디 리스트를 키워드 알림 API에 전송
       */
      console.log(
        '키워드 알림 전송이 필요한 키워드번호 리스트: ',
        JSON.stringify(matchedKeywords),
      );

      res.status(200).json({
        message: '키워드 알림 성공',
      });
    } catch (error) {
      if (error instanceof ApplicationError) {
        res.status(error.statusCode).json(error.message);
      } else {
        next(error);
      }
    }
  },
};
