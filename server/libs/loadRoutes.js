
const fs = require('fs');
const path = require('path');

const loadRoutes = (app, dirPath) => {
  fs.readdirSync(dirPath).forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.lstatSync(fullPath);

    if (stat.isDirectory()) {
      loadRoutes(app, fullPath);
    } else if (file === "route.js") {
      const route = require(fullPath);
      app.use(route);
    }
  });
};

module.exports = { loadRoutes }