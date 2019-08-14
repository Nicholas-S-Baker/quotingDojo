const Quote = require("../models/quote");

exports.index = function(req, res) {
  res.render("index");
};
exports.quotes = function(req, res) {
  const quote = new Quote();
  quote.name = req.body.name;
  quote.quote = req.body.quote;
  quote
    .save()
    .then(newQuoteData => {
      console.log("quote made: ", newQuoteData);
      Quote.find()
        .sort({ createdAt: -1 })
        .then(quotes => {
          console.log("***********IN THEN");
          data = quotes;
          console.log(data);
          res.render("quotes", { data: data });
        })
        .catch(err => {
          console.log("We have an error!", err);
          for (var key in err.errors) {
            req.flash("registration", err.errors[key].message);
          }
          res.render("index");
        });
    })
    .catch(err => {
      console.log("We have an error!", err.errors);
      for (var key in err.errors) {
        console.log("key --> ", key);
        console.log("err.errors[key] --> ", err.errors[key]);
        console.log("err.errors[key].message --> ", err.errors[key].message);
        req.flash("registration", err.errors[key].message);
      }
      res.render("index");
    });
};
exports.skip = function(req, res) {
  console.log("*" * 80 + "IN POST");
  Quote.find()
    .sort({ createdAt: -1 })
    .then(quotes => {
      console.log("***********IN THEN");
      data = quotes;
      console.log(data);
      res.render("quotes", { data: data });
    })
    .catch(err => res.json(err));
};
