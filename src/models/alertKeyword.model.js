import { DataTypes } from 'sequelize';

module.exports = (sequelize) => {
  const AlertKeyword = sequelize.define(
    'AlertKeyword',
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
      owner: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '작성자 이름',
      },
    },
    {
      freezeTableName: true,
      tableName: 'AlertKeyword',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
      ],
    },
  );

  return AlertKeyword;
};
