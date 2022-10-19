const mongoose = require("mongoose");

const bmiSchema = mongoose.Schema({
    bmi: { type: Number, require: true },
    userId: { type: String, require: true }
})

const BmiModel = mongoose.model("bmi", bmiSchema)

module.exports = BmiModel;