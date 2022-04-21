import { DataTypes } from 'sequelize';

module.exports = (sequelize) => {
  const SubComments = sequelize.define(
    'SubComments',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: '대댓글 번호',
      },
      pcId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: '댓글 번호',
        references: {
          model: 'Comments',
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
      tableName: 'SubComments',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }, { name: 'pcId' }],
        },
        {
          name: 'FK_Comments_TO_SubComments_1',
          using: 'BTREE',
          fields: [{ name: 'pcId' }],
        },
      ],
    },
  );

  SubComments.associate = function (models) {
    SubComments.belongsTo(models.Comments, { as: 'pc', foreignKey: 'pcId' });
  };

  return SubComments;
};
