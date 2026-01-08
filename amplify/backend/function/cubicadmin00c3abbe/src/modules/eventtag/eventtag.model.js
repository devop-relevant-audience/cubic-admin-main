const mongoose = require("mongoose");
const { timestampPlugin } = require("../../plugins/time.plugin");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const EventtagSchema = new mongoose.Schema(
  {
    tag: String,
  },
  {
    versionKey: false,
  }
);

EventtagSchema.plugin(timestampPlugin);
EventtagSchema.plugin(mongooseLeanVirtuals);
const Eventtag = mongoose.model("eventtag", EventtagSchema, "eventtag");
/** @type {import('mongoose').Model} */
module.exports = Eventtag;
