import request from 'supertest'
import { Connection, createConnection, getConnection, Migration } from 'typeorm'
import { app } from '../app'

describe('Users', function () {
  let migrations: Migration[]
  let connection: Connection

  beforeAll(async () => {
    try {
      connection = await createConnection()
    } catch (error) {
      console.log(error)
    }

    try {
      migrations = await connection.runMigrations()
    } catch (error) {
      console.log(error)
    }

    console.log('beforeAll')
  })

  beforeEach(() => {
    console.log('beforeEach')
  })

  afterEach(() => {
    console.log('afterEach')
  })

  afterAll(async () => {
    const mainConnection = getConnection()

    for (const migration of migrations) {
      await connection.undoLastMigration()
    }

    console.log('afterAll')

    await connection.close()
    await mainConnection.close()
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

// describe('Users', () => {
//   beforeAll(async () => {
//     let connection

//     try {
//       connection = await createConnection()
//     } catch (error) {
//       console.log(error)
//     }

//     try {
//       await connection.runMigrations()
//     } catch (error) {
//       console.log(error)
//     }
//     await connection.runMigrations()
//   })

//   it('Should be able to create a new user.', async () => {
//     const response = await request(app).post('/users').send({
//       name: 'User Example',
//       email: 'user@example.com'
//     })

//     expect(response.status).toBe(201)
//   })

//   it('Should not be able to create a user with the same email.', async () => {
//     const response = await request(app).post('/users').send({
//       name: 'User Example',
//       email: 'user@example.com'
//     })

//     expect(response.status).toBe(400)
//   })
// })