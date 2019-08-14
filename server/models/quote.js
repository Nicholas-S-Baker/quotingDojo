const mongoose = require("mongoose");
const QuoteSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Must have a name"], minlength: 2 },
    quote: { type: String, required: [true, "Must have a quote"], minlength: 5 }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Quote", QuoteSchema);