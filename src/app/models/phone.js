'use strict'
module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define('Phone', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    numero: DataTypes.STRING,
    ddd: DataTypes.STRING,
    UserId: DataTypes.UUID,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    tableName: 'Phones'
  })
  Phone.associate = function(models) {
    Phone.belongsTo(models.User)
  }
  return Phone
}
