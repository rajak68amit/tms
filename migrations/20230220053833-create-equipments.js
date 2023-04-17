'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('equipments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      invoiceDate: {
        type: Sequelize.DATE
      },
      manufacturerName: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('equipments');
  }
};