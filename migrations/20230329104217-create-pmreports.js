'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pmreports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      udiseid: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.DATE
      },
      qone_date: {
        type: Sequelize.DATE
      },
      qone_url: {
        type: Sequelize.STRING
      },
      qtwo_date: {
        type: Sequelize.DATE
      },
      qtwo_url: {
        type: Sequelize.STRING
      },
      qthree_date: {
        type: Sequelize.DATE
      },
      qthree_url: {
        type: Sequelize.STRING
      },
      qfour_date: {
        type: Sequelize.DATE
      },
      qfour_url: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pmreports');
  }
};