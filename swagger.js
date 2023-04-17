/*jslint node: true */
/* jshint esversion: 8 */
/*jshint -W033 */
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TMS APIs',
      version: '1.0.0',
      description: 'Swagger documentation for TMS APIs'
    },
    servers: [
      {
        url: 'http://localhost:4000/'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./swagger.js', './controllers/*.js', './controllers/admin/*.js', './models/*.js', './controllers/customer/*.js', './controllers/serviceengineer/*.js', './controllers/superviser/*.js', './controllers/user/*.js']
}
const specs = swaggerJsdoc(options)
module.exports = specs

/**
* @swagger
* components:
*  schemas:
*   SuccessResponse:
*    type: object
*    example:
*     status: 200
*     meta: {}
*     info: {}
*     errors: []
*     data: []
*     message: success message
*   ErrorResponse:
*    type: object
*    example:
*     status: 500
*     data: []
*     message: error message
*     errors: ['error descriptors']
*     meta: {}
*     info: {}
*   ValidationResponse:
*    type: object
*    example:
*     status: 422
*     data: []
*     message: validation error message
*/

