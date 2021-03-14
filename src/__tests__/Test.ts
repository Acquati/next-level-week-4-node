import request from 'supertest'
import express from 'express'

const app = express()

app.get('/users', function (request, response) {
  response.status(200).json({ name: 'john' })
})

app.post('/users', function (request, response) {
  response.status(200).json({ name: 'john' })
})

app.get('/surveys', function (request, response) {
  response.status(200).json({ name: 'john' })
})

describe('GET /users', function () {
  it('responds with json', function (done) {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('POST /users', function () {
  it('responds with json', function (done) {
    request(app)
      .post('/users')
      .send({ name: 'john' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (error, response) {
        if (error) return done(error)
        return done()
      })
  })
})