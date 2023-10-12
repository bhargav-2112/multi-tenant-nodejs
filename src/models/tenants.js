'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tenants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tenants.hasMany(models.users, {
        foreignKey: 'tenant_id',
        sourceKey: 'id',
        as: 'tenant_tenant'
      });
    }
  }
  tenants.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tenants',
    tableName: 'tenants',
    underscored: false
  });
  return tenants;
};