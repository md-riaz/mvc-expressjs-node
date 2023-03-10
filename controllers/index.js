const Controller = require("./controller");

const Database = require("../config/database");

class IndexController extends Controller {
  static async index(req, res) {

    let db = new Database();

    db = await db.connect();

    const rows = await db.query("SELECT * FROM `departments`");

    res.json(rows);
  }
}

module.exports = IndexController;
