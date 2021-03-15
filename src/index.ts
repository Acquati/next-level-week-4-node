import createConnection from './database'
import { app } from './app'

createConnection()
  .then(() => {
    app.listen(3333, () => {
      console.log('Express server has started on port 3333. Open http://localhost:3333/users to see results.')
    })
  })
  .catch(error => console.log(error))
