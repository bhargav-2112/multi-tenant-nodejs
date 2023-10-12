/* Hooks object */
// https://github.com/sequelize/sequelize/blob/v6/lib/hooks.js#L7
const hooks = {
  beforeCreate: [],
  beforeUpdate: [],
  beforeFind(query) {
      if (this.sequelize.options.tenant_id && this.options.multitenant && !this.sequelize.options.tenant_safe) {
          query.where = Object.assign({}, query.where, {
              tenant_id: this.sequelize.options.tenant_id
          });
      }
  },
  beforeSave: [],
  beforeBulkCreate: [],
  beforeBulkUpdate: [],
  beforeBulkDestroy: [],
  beforeValidate(instance, options) {
      if (this.sequelize.options.tenant_id && this.options.multitenant && !this.sequelize.options.tenant_safe) {
          instance.tenant_id = this.sequelize.options.tenant_id;
      }
  },
  afterCreate: [],
  afterUpdate: [],
  afterFind: [],
  afterFindAll: [],
  afterBulkCreate: [],
  afterBulkUpdate: [],
  afterBulkDestroy: [],
  afterValidate: [],
  beforeDestroy: [],
};
module.exports = hooks;
