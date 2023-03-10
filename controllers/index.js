const Controller = require('./controller');

class IndexController extends Controller {
  
  static index(req, res) {
    console.log('req');
    res.json({"msg": "Hello world!"});
  }

}

module.exports = IndexController;