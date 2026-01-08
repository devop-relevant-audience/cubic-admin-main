const mongoose = require("mongoose");
const { timestampPlugin } = require("../../plugins/time.plugin");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const EventSchema = new mongoose.Schema(
  {
    image: String,
    name: String,
    club: [],
    start_date: String,
    end_date: String,
    time: String,
    thumbnail: String,
  },
  {
    versionKey: false,
  }
);

EventSchema.plugin(timestampPlugin);
EventSchema.plugin(mongooseLeanVirtuals);
const Event = mongoose.model("event", EventSchema, "event");
/** @type {import('mongoose').Model} */
module.exports = Event;
