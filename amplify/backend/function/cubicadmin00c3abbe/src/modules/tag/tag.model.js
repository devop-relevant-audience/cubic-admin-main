const mongoose = require("mongoose");
const { timestampPlugin } = require("../../plugins/time.plugin");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const TagSchema = new mongoose.Schema(
  {
    tag: String,
  },
  {
    versionKey: false,
  }
);

TagSchema.plugin(timestampPlugin);
TagSchema.plugin(mongooseLeanVirtuals);
const Tag = mongoose.model("tag", TagSchema, "tag");
/** @type {import('mongoose').Model} */
module.exports = Tag;
