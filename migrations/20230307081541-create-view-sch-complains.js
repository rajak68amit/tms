'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('view_sch_complains', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ticketid: {
        type: Sequelize.NUMBER
      },
      created_date: {
        type: Sequelize.DATE
      },
      block_name: {
        type: Sequelize.STRING
      },
      issues_details: {
        type: Sequelize.STRING
      },
      assignTo: {
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
    await queryInterface.dropTable('view_sch_complains');
  }
};