import mysql from 'mysql'

const pool = mysql.createPool({
  host: process.env.DATABASE_HOSTNAME,
  user: process.env.DATABASE_USERNAME, 
  password: process.env.MARIADB_PASS,
  database: process.env.BDTS_MEDIA,
  port: process.env.DATABASE_PORT,
})

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MariaDB:', err)
    return 
  }
  console.log('Connected to MariaDB!')
  connection.release()
})

export default pool
