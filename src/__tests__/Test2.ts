import request from 'supertest'
import express from 'express'

const app = express()

app.get('/users', function (request, response) {
  response.status(200).json({ name: 'john' })
})

app.get('/surveys', function (request, response) {
  response.status(200).json({ title: 'promotion' })
})

describe('GET /users', function () {
  beforeAll(() => {
    console.log('beforeAll')
  })

  beforeEach(() => {
    console.log('beforeEach')
  })

  afterEach(() => {
    console.log('afterEach')
  })

  afterAll(() => {
    console.log('afterAll')
  })

  it('Should get user with name john.', function (done) {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.name).toEqual('john')
        done()
      })
      .catch(error => done(error))
  })

  it('Should get survey with title promotion.', function (done) {
    request(app)
      .get('/surveys')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.title).toEqual('promotion')
        done()
      })
      .catch(error => done(error))
  })
})