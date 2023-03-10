const Controller = require("./controller");
const fs = require("fs");
const path = require("path");

class APIController extends Controller {
  static index(req, res) {
    res.json({ msg: "Post to the api/create path with pathname param" });
  }

  static create(req, res) {
    const { pathname } = req.body;

    if (pathname.length != 0) {
      // Create controller file
      const controllerPath = path.join(
        __dirname,
        "..",
        "controllers",
        `${pathname}.js`
      );
      let upperppathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
      fs.writeFileSync(
        controllerPath,
        `const Controller = require('./controller');\n\nclass ${upperppathname}Controller extends Controller {} \nmodule.exports = ${upperppathname}Controller;`
      );

      // Create route file
      const routePath = path.join(__dirname, "..", "routes", `${pathname}.js`);
      fs.writeFileSync(
        routePath,
        `const express = require("express");\nconst router = express.Router();\nconst ${upperppathname}Controller = require("../controllers/${pathname}");\n\nrouter.get("/", ${upperppathname}Controller.index);\n\nmodule.exports = router;`
      );
    }

    res.json({
      msg: `Controller and route for '${pathname}' created successfully`,
    });
  }
}

module.exports = APIController;
