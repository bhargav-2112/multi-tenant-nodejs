const { RECORD_FOUND } = require("./constants");

/**
 * Function to send json data to user with specific format.
 * 
 * @param {any} data - Data to send in response 
 * @param {HttpCode} code - Http response code 
 * @param {String} message - Message for the response 
 * @returns 
 */
module.exports.sendResponse = (
    data = null,
    code = 200,
    message = RECORD_FOUND
  ) => {
    return {
      data,
      code,
      message,
    };
};

module.exports.resolveConnection = (tenantId) => {
  if (!tenantId) {
    throw new Error('Tenant ID is required.');
  }

  const tenantConfig = {
    ...config[process.env.NODE_ENV], // Use the appropriate environment
    database: `tenant_${tenantId}`, // Adjust this to your naming convention
  };

  return new Sequelize(tenantConfig);
};