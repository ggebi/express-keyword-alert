import { DataTypes } from 'sequelize';

module.exports = (sequelize) => {
  const KeywordSubscribers = sequelize.define(
    'KeywordSubscribers',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: '키워드구독자 번호',
      },
      keywordId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '키워드 번호',
      },
      userName: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '유저 아이디',
      },
    },
    {
      freezeTableName: true,
      tableName: 'KeywordSubscribers',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'FK_Keyword_TO_KeywordSubscribers_1',
          using: 'BTREE',
          fields: [{ name: 'keywordId' }],
        },
      ],
    },
  );

  KeywordSubscribers.associate = function (models) {
    KeywordSubscribers.belongsTo(models.Keyword, {
      as: 'keyword',
      foreignKey: 'keywordId',
    });
  };

  return KeywordSubscribers;
};
