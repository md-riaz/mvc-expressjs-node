const express = require("express");
const fs = require("fs");
const path = require("path");
const middlewares = require("./middlewares");

const app = express();

const router = express.Router();

// Load routes for all files
fs.readdirSync(path.join(__dirname, "routes")).forEach((file) => {
  const routeName = path.basename(file, ".js");
  const routePrefix = "/" + routeName; // Use route file name as prefix
  const route = require("./routes/" + file);

  if (routeName === "index") {
    router.use("/", route);
  } else {
    router.use(routePrefix, route);
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(middlewares);

app.use(router);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
