const mysql = require('mysql2/promise');

class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    this.connection = await mysql.createConnection({
      host: process.env.HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'no_db'
    });
  }

  async query(sql, args) {
    const [rows] = await this.connection.execute(sql, args);
    return this;
  }

  async fetchAll() {
    return this.rows;
  }

  async close() {
    await this.connection.end();
  }

  async beginTransaction() {
    await this.connection.beginTransaction();
  }

  async commit() {
    await this.connection.commit();
  }

  async rollback() {
    await this.connection.rollback();
  }
}

module.exports = Database;
