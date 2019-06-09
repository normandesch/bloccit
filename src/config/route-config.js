const staticRoutes = require("../routes/static");
const topicRoutes = require("../routes/topics");
const advertisementRoutes = require("../routes/advertisements");

module.exports = {
  init(app){
    app.use(staticRoutes);
    app.use(topicRoutes);
    app.use(advertisementRoutes);
  }
}
