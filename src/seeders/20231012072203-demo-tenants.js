'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('tenants', 
    [
      {
        name: 'johndoe',
        url: 'johndoe.example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'jamesdoe',
        url: 'jamesdoe.example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'murielbing',
        url: 'murielbing.example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
