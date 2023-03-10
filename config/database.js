const mysql = require('mysql2/promise');

class Database {
  constructor(options = {}) {
    this.connection = null;
    this.options = options;
  }

  async connect() {
    this.connection = await mysql.createConnection({
      host: this.options.host || process.env.HOST || 'localhost',
      user: this.options.user || process.env.DB_USER || 'root',
      password: this.options.password || process.env.DB_PASS || '',
      database: this.options.database || process.env.DB_NAME || 'no_db'
    });

    return this;
  }

  async query(sql, params = []) {
    try {
      const [rows] = await this.connection.execute(sql, params);
      return rows;
    } catch (error) {
      throw new Error(`Error executing query: ${error.message}`);
    }
  }

  async insert(table, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = new Array(values.length).fill('?').join(',');
    const sql = `INSERT INTO ${table} (${keys.join(',')}) VALUES (${placeholders})`;
    const result = await this.query(sql, values);
    return { id: result.insertId };
  }

  async update(table, data, conditions = {}) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map((key) => `${key} = ?`).join(',');
    const whereClause = Object.keys(conditions).map((key) => `${key} = ?`).join(' AND ');
    const whereValues = Object.values(conditions);
    const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
    const result = await this.query(sql, [...values, ...whereValues]);
    return { affectedRows: result.affectedRows };
  }

  async delete(table, conditions = {}) {
    const whereClause = Object.keys(conditions).map((key) => `${key} = ?`).join(' AND ');
    const whereValues = Object.values(conditions);
    const sql = `DELETE FROM ${table} WHERE ${whereClause}`;
    const result = await this.query(sql, whereValues);
    return { affectedRows: result.affectedRows };
  }

  async disconnect() {
    if (this.connection) {
      await this.connection.end();
    }
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

  async executeTransaction(callback) {
    try {
      await this.beginTransaction();
      await callback();
      await this.commit();
    } catch (error) {
      await this.rollback();
      throw error;
    }
  }

  
};






module.exports = Database;
