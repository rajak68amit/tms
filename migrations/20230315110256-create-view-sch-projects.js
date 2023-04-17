'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('view_sch_projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amc_date: {
        type: Sequelize.DATE
      },
      projects_id: {
        type: Sequelize.NUMBER
      },
      projects_name: {
        type: Sequelize.STRING
      },
      total_school: {
        type: Sequelize.NUMBER
      },
      total_class: {
        type: Sequelize.NUMBER
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
    await queryInterface.dropTable('view_sch_projects');
  }
};