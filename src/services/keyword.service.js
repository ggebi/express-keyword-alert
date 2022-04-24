import db from '../models/index';

export default {
  matching: async (words) => {
    const keywords = await db.Keyword.findAll({
      attributes: ['id', 'keyword'],
      where: {
        keyword: { [db.Sequelize.Op.in]: words },
      },
      order: [['id', 'DESC']],
    });
    return keywords;
  },
};
