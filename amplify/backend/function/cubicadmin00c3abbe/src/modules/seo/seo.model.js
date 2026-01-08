const mongoose = require("mongoose");
const { timestampPlugin } = require("../../plugins/time.plugin");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const SeoSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    description: String,
  },
  { versionKey: false }
);

SeoSchema.plugin(timestampPlugin);
SeoSchema.plugin(mongooseLeanVirtuals);
const Seo = mongoose.model("seo", SeoSchema, "seo");
/** @type {import('mongoose').Model} */
module.exports = Seo;
