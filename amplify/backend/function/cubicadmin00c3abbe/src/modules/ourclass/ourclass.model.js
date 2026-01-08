const mongoose = require("mongoose");
const { timestampPlugin } = require("../../plugins/time.plugin");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const OurclassSchema = new mongoose.Schema(
  {
    class_name: String,
    duration: String,
    class_description: String,
    class_photo: String,
  },
  {
    versionKey: false,
  }
);

OurclassSchema.plugin(timestampPlugin);
OurclassSchema.plugin(mongooseLeanVirtuals);
const Ourclass = mongoose.model("ourclass", OurclassSchema, "ourclass");
/** @type {import('mongoose').Model} */
module.exports = Ourclass;
