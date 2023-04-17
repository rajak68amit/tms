require('dotenv').config()
process.env.ENVIRONMENT = 'local'
process.env.NODE_ENV = 'test'const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')chai.should()
chai.use(chaiHttp)
describe('Users Module:', () => {


    describe('GET /api/user/getaccesstoken/:sub', () => {
        it('it should generate internal access token', async () => {
            const sub = 'b8d02026-dd63-40a9-b905-0b3bc4f789c8'
            const res = await chai.request(server).get('/api/user/getaccesstoken/' + sub)
            res.should.have.status(200)
            res.body.data.should.have.property('access_token')
            access_token = res.body.data.access_token
        })
    })


  /**   * Test the POST route   */  describe('POST /api/user/insertUserDetails', () => {
        it('it should INSERT new user\'s details into the database', async () => {
            const userData = { "username": "rameshj@gmail.com", "sub": "b8d02026-dd63-40a9-b905-0b3bc4f789c8", "sid": "d15d4ecf-9497-4300-a8fc-1c65e0680041", "phone_number": "4741749261", "firstname": "Ramesh", "lastname": "Jograna", "email": "rameshj@gmail.com", "email_verified": true, "nickname": "Ram", "dob": "1990-01-09", "nin": "01234567893", "address": { "street_address": "Suburbia 23", "postal_code": "2101", "region": "OSLO", "country": "NO", "formattedAddress": "Suburbia 23\\n2101 OSLO\\nNO", "address_type": "home" } }
            const res = await chai.request(server).post('/api/user/insertUserDetails').send(userData)
            res.should.have.status(201)
            res.body.should.be.a('object')

            res.body.data.usersDetails.should.be.a('object')
            res.body.data.usersAddress.should.be.a('object')
        })
        it('it should NOT INSERT new user\'s details into the database', async () => {
            const userData = { "sub": "b8d02026-dd63-40a9-b905-0b3bc4f789c8", "sid": "d15d4ecf-9497-4300-a8fc-1c65e0680041", "phone_number": "4741749261", "firstname": "Ramesh", "lastname": "Jograna", "email": "rameshj@gmail.com", "email_verified": true, "nickname": "Ram", "dob": "1990-01-09", "nin": "01234567893", "address": { "street_address": "Suburbia 23", "postal_code": "2101", "region": "OSLO", "country": "NO", "formattedAddress": "Suburbia 23\\n2101 OSLO\\nNO", "address_type": "home" } }
            const res = await chai.request(server).post('/api/user/insertUserDetails').send(userData)
            res.should.have.status(422)
            res.body.should.be.a('object')
        })
    })

    
})