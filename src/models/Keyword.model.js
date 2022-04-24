import { DataTypes } from 'sequelize';

module.exports = (sequelize) => {
  const Keyword = sequelize.define(
    'Keyword',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: '키워드알림 번호',
      },
      keyword: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '키워드',
      },
    },
    {
      freezeTableName: true,
      tableName: 'Keyword',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'searchKeyword',
          using: 'BTREE',
          fields: [{ name: 'keyword' }],
        },
      ],
    },
  );

  Keyword.associate = function (models) {
    Keyword.hasMany(models.KeywordSubscribers, {
      as: 'KeywordSubscribers',
      foreignKey: 'keywordId',
    });
  };

  return Keyword;
};
