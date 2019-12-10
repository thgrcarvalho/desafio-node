import Sequelize from 'sequelize';
import { DataTypes } from 'sequelize'
import User from '../app/models/user';
import Phone from '../app/models/phone'
import databaseConfig from '../config/database';

class Database {
  constructor() {
    this.models = {
      User: User,
      Phone: Phone
    }

    this.instantiatedModels = {}

    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    Object.keys(this.models).map(modelKey => {
      const model = this.models[modelKey]

      this.instantiatedModels[modelKey] = model(this.connection, DataTypes)
    });

    Object.keys(this.models).map(modelKey => {
      this.instantiatedModels[modelKey].associate(this.connection.models)
    })
  }

  getModels() {
    return this.instantiatedModels
  }
}

export default new Database().getModels();
