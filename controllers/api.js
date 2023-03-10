const Controller = require("./controller");
const fs = require("fs");
const path = require("path");

class APIController extends Controller {
  static index(req, res) {
    res.json({ msg: "Post to the api/create path with pathname param" });
  }

  static create(req, res) {
    const { pathname } = req.body;

    if (pathname && pathname.length != 0) {
      // Create controller file
      const controllerPath = path.join(
        __dirname,
        "..",
        "controllers",
        `${pathname}.js`
      );

      const upperppathname =
        pathname.charAt(0).toUpperCase() + pathname.slice(1);

      fs.writeFileSync(
        controllerPath,
        `const Controller = require('./controller');\n\nclass ${upperppathname}Controller extends Controller {\nstatic index(req, res) {\nres.json({ msg: "Just created freash new route in /${pathname} route" });}\n} \nmodule.exports = ${upperppathname}Controller;`,
        { flag: "wx" }
      );

      // Create route file
      const routePath = path.join(__dirname, "..", "routes", `${pathname}.js`);
      fs.writeFileSync(
        routePath,
        `const express = require("express");\nconst router = express.Router();\nconst ${upperppathname}Controller = require("../controllers/${pathname}");\n\nrouter.get("/", ${upperppathname}Controller.index);\n\nmodule.exports = router;`,
        { flag: "wx" }
      );
    }

    res.json({
      msg: `Controller and route for '${pathname}' created successfully`,
    });
  }
}

module.exports = APIController;
