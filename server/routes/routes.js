module.exports = function(app){
  const controller = require("../controllers/quotes.js");
  app.get("/", controller.index);
  app.post("/quotes", controller.quotes);
  app.get("/skip", controller.skip);
}