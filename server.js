const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(
  session({
    secret: "keyboardkitteh",
    resave: false,
    saveUninitialized: true
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/static"));
app.use(flash());

mongoose.connect("mongodb://localhost/quoting_dojo", { useNewUrlParser: true });
const QuoteSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Must have a name"], minlength: 2 },
    quote: { type: String, required: [true, "Must have a quote"], minlength: 5 }
  },
  { timestamps: true }
);
const Quote = mongoose.model("Quote", QuoteSchema);

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/quotes", (req, res) => {
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
        console.log('key --> ', key);
        console.log('err.errors[key] --> ', err.errors[key]);
        console.log('err.errors[key].message --> ', err.errors[key].message);
        req.flash("registration", err.errors[key].message);
      }
      res.render("index");
    });
});

app.get("/skip", (req, res) => {
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
});

app.listen(8000, () => console.log("PORT 8000 - Quoting Dojo"));
