import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()

  return createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === 'test'
          ? 'test'
          : defaultOptions.database,
      migrationsRun:
        process.env.NODE_ENV === 'test'
          ? false
          : defaultOptions.migrationsRun,
      logging:
        process.env.NODE_ENV === 'test'
          ? false
          : defaultOptions.logging
    })
  )
}