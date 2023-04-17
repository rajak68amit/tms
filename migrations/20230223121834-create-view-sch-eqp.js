'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('view_sch_eqps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      manufacturerName: {
        type: Sequelize.STRING
      },
      invoiceDate: {
        type: Sequelize.DATE
      },
      warrantyEndDate: {
        type: Sequelize.DATE
      },
      about: {
        type: Sequelize.STRING
      },
      serialno: {
        type: Sequelize.STRING
      },
      typeId: {
        type: Sequelize.NUMBER
      },
      isActive: {
        type: Sequelize.NUMBER
      },
      isDelete: {
        type: Sequelize.NUMBER
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      equipmetmappings.id: {
        type: Sequelize.NUMBER
      },
      equipmetmappings.eqpid: {
        type: Sequelize.NUMBER
      },
      equipmetmappings.udisecode: {
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
    await queryInterface.dropTable('view_sch_eqps');
  }
};