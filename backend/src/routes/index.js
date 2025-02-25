const authRoutes = require("./auth.routes");

function setRoutes(app) {
  app.get("/api", (req, res) => {
    res.send("Hello World!");
  });
  app.use("/api/auth", authRoutes);
}

module.exports = {
  setRoutes,
};
