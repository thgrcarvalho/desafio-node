'use strict'

import bcrypt from 'bcrypt'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.VIRTUAL,
    senhaHash: DataTypes.STRING,
    cep: DataTypes.STRING,
    token: DataTypes.STRING,
    ultimoLogin: DataTypes.DATE,
  }, {
    hooks: {
      beforeSave: async (user) => {
        if (user.senha) {
          user.senhaHash = await bcrypt.hash(user.senha, 8)
          user.ultimoLogin = new Date()
        }
      },
      afterSave: (user) => {
        user.ultimoLogin = user.createdAt
      }
    },
    tableName: 'Users'
  })
  User.associate = function(models) {
    User.hasMany(models.Phone,)
  }
  User.prototype.checkPassword = function(senha) {
    return bcrypt.compare(senha, this.senhaHash)
  }
  return User
}
