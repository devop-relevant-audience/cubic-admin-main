const mongoose = require("mongoose");
const { timestampPlugin } = require("../../plugins/time.plugin");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const TrainertagSchema = new mongoose.Schema(
  {
    tag: String,
  },
  {
    versionKey: false,
  }
);

TrainertagSchema.plugin(timestampPlugin);
TrainertagSchema.plugin(mongooseLeanVirtuals);
const Trainertag = mongoose.model("trainertag", TrainertagSchema, "trainertag");
/** @type {import('mongoose').Model} */
module.exports = Trainertag;
