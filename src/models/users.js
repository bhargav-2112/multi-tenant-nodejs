'use strict';
const {
  Model, Sequelize
} = require('sequelize');
const hooksModels = require('../utils/hooks');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.belongsTo(models.tenants, {
        foreignKey: 'tenant_id',
        sourceKey: 'id',
        as: 'tenant_user'
      });
    }
  }
  users.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tenant_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    token: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    modelName: 'users',
    tableName: 'users',
    underscored: false,
    hooks: hooksModels
  },
  );
  return users;
};