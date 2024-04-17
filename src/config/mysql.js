import mysql from 'mysql'
import fs from 'fs'

const connectDB = mysql.createPool({
  host: process.env.DATABASE_HOSTNAME,
  user: process.env.DATABASE_USERNAME, 
  password: process.env.MARIADB_PASS,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
})

const initializeDB = () => {
  return new Promise((resolve, reject) => {
    connectDB.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to MariaDB:', err)
        reject(err)
      } else {
        console.log('Connected to MariaDB!')

        const sqlCreateDB = fs.readFileSync('src/config/createDatabase.sql', 'utf8')
        const sqlCreateTable = fs.readFileSync('src/config/createTable.sql', 'utf8')

        connection.query(sqlCreateDB, (err, results) => {
          if (err) {
            console.error('Error creating database:', err)
            reject(err)
          } else {
            console.log('Database created successfully!')

            connection.query(sqlCreateTable, (err, results) => {
              if (err) {
                console.error('Error creating tables:', err)
                reject(err)
              } else {
                console.log('Tables created successfully!')
                connection.release()
                resolve()
              }
            })
          }
        })
      }
    })
  })
}

export { connectDB, initializeDB }
