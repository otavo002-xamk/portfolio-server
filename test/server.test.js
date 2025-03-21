require('dotenv').config()
const request = require('supertest')
const app = require('../server')
const tableContentJSON = require(`./${process.env.DB_RANDOM_TABLE_NAME_JSON_FILE}`)
const alltables = require('./alltables')

describe('api', () => {
  it('should return tables', (done) => {
    request(app)
      .get('/_api')
      .expect('Content-Type', /json/)
      .expect(200, alltables)
      .end((err, _res) => {
        if (err) throw err
        done()
      })
  })

  it(`should return the ${process.env.DB_RANDOM_TABLE_NAME_JSON_FILE}`, (done) => {
    request(app)
      .post('/_api')
      .send({ table: `${process.env.DB_RANDOM_TABLE_NAME}` })
      .expect('Content-Type', /json/)
      .expect(200, tableContentJSON)
      .end((err, _res) => {
        if (err) throw err
        done()
      })
  })
})
