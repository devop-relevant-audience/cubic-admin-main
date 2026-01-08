const mongoose = require("mongoose");
const { timestampPlugin } = require("../../plugins/time.plugin");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const BannerSchema = new mongoose.Schema(
  {
    desktop_photo: String,
    mobile_photo: String,
  },
  {
    versionKey: false,
  }
);

BannerSchema.plugin(timestampPlugin);
BannerSchema.plugin(mongooseLeanVirtuals);
const Banner = mongoose.model("banner", BannerSchema, "banner");
/** @type {import('mongoose').Model} */
module.exports = Banner;
