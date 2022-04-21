import { DataTypes } from 'sequelize';

module.exports = (sequelize) => {
  const Comments = sequelize.define(
    'Comments',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: '댓글 번호',
      },
      boardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: '게시판 번호',
        references: {
          model: 'Board',
          key: 'id',
        },
      },
      msg: {
        type: DataTypes.STRING(254),
        allowNull: false,
        comment: '메세지',
      },
      owner: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '작성자',
      },
    },
    {
      freezeTableName: true,
      tableName: 'Comments',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }, { name: 'boardId' }],
        },
        {
          name: 'FK_Board_TO_Comments_1',
          using: 'BTREE',
          fields: [{ name: 'boardId' }],
        },
      ],
    },
  );

  Comments.associate = function (models) {
    Comments.belongsTo(models.Board, { as: 'board', foreignKey: 'boardId' });
    Comments.hasMany(models.SubComments, {
      as: 'SubComments',
      foreignKey: 'pcId',
    });
  };

  return Comments;
};
