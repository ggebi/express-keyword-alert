import bcrypt from 'bcryptjs';
import { DataTypes } from 'sequelize';

module.exports = (sequelize) => {
  const Board = sequelize.define(
    'Board',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: '게시판 번호',
      },
      title: {
        type: DataTypes.STRING(254),
        allowNull: false,
        comment: '제목',
      },
      contents: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '내용',
      },
      owner: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '작성자 이름',
      },
      pwd: {
        type: DataTypes.CHAR(72),
        allowNull: false,
        comment: '비밀번호',
        set(value) {
          this.setDataValue('pwd', bcrypt.hashSync(value, 10));
        },
      },
    },
    {
      freezeTableName: true,
      tableName: 'Board',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'searchTitle',
          using: 'BTREE',
          fields: [{ name: 'title' }],
        },
        {
          name: 'searchOwner',
          using: 'BTREE',
          fields: [{ name: 'owner' }],
        },
      ],
    },
  );

  Board.associate = function (models) {
    Board.hasMany(models.Comments, { as: 'Comments', foreignKey: 'boardId' });
  };

  /**
   * 패스워드 체크
   * @param {*} plaintextPassword
   * @param {*} hashedPassword
   * @returns boolean
   */
  Board.comparePassword = async function (plaintextPassword, hashedPassword) {
    return bcrypt.compare(plaintextPassword, hashedPassword);
  };

  return Board;
};
