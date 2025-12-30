const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // standardized name
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection (non-fatal)
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✔ Database connection pool established.');
    connection.release();
  } catch (error) {
    console.error('✘ Database connection failed. Check DB config.');
  }
})();

module.exports = pool;
