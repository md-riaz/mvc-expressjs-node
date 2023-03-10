const fs = require('fs');
const path = require('path');

class Controller {
  constructor() {
    this.model = this.loadModel();
  }

  loadModel() {
    const modelName = this.constructor.name.replace('Controller', '');
    const modelFile = path.join(__dirname, '..', 'models', modelName.toLowerCase() + '.js');
    if (fs.existsSync(modelFile)) {
      const Model = require(modelFile);
      return new Model();
    }
  }

}

module.exports = Controller;
