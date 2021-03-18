import request from 'supertest'
import { Connection, Migration } from 'typeorm'
import createConnection from '../database'
import { app } from '../app'

describe('Surveys', function () {
  let migrations: Migration[]
  let connection: Connection

  beforeAll(async () => {
    try {
      connection = await createConnection()
    } catch (error) { console.log(error) }

    try {
      migrations = await connection.runMigrations()
    } catch (error) { console.log(error) }
  })

  afterAll(async () => {
    for (const _migration of migrations) {
      try {
        await connection.undoLastMigration()
      } catch (error) { console.log(error) }
    }

    try {
      await connection.close()
    } catch (error) { console.log(error) }
  })

  it('Should be able to create a new survey.', done => {
    request(app)
      .post('/surveys')
      .send({
        title: 'Title Example',
        description: 'Description Example'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body.message).toEqual('Survey created successfully.')
        done()
      })
      .catch(error => done(error))
  })

  it('Should be able to list all surveys.', done => {
    request(app)
      .get('/surveys')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.data[0].title).toEqual('Title Example')
        expect(response.body.data[0].description).toEqual('Description Example')
        done()
      })
      .catch(error => done(error))
  })
})