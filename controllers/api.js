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
      fs.writeFileSync(
        controllerPath,
        `class ${pathname}Controller extends Controller {} \nmodule.exports = ${pathname}Controller;`
      );

      // Create route file
      const routePath = path.join(__dirname, "..", "routes", `${pathname}.js`);
      fs.writeFileSync(
        routePath,
        `const express = require("express");\nconst router = express.Router();\nconst ${pathname}Controller = require("../controllers/${pathname}");\n\nrouter.get("/", ${pathname}Controller.index);\n\nmodule.exports = router;`
      );
    }
    
    res.json({
      msg: `Controller and route for '${pathname}' created successfully`,
    });
  }
}

module.exports = APIController;
