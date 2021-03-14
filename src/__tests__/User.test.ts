import request from 'supertest'
import { Connection, createConnection, Migration } from 'typeorm'
import { app } from '../app'

describe('Users', function () {
  let migrations: Migration[]
  let connection: Connection

  beforeAll(async () => {
    try {
      connection = await createConnection()
    } catch (error) { console.log(error) }

    try {
      migrations = await connection.runMigrations()
    } catch (error) { console.log(error) }

    console.log('beforeAll')
  })

  beforeEach(() => {
    console.log('beforeEach')
  })

  afterEach(() => {
    console.log('afterEach')
  })

  afterAll(async () => {
    for (const _migration of migrations) {
      try {
        await connection.undoLastMigration()
      } catch (error) { console.log(error) }
    }

    console.log('afterAll')

    try {
      await connection.close()
    } catch (error) { console.log(error) }
  })

  it('Should be able to create a new user.', function (done) {
    request(app)
      .post('/users')
      .send({
        email: "user@example.com",
        name: "User Example"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body.message).toEqual('User created successfully.')
        done()
      })
      .catch(error => done(error))
  })
})