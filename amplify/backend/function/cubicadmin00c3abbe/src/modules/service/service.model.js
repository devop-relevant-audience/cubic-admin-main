const mongoose = require("mongoose");
const { timestampPlugin } = require("../../plugins/time.plugin");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const ServiceSchema = new mongoose.Schema(
  {
    card_home_desktop: String,
    card_home_mobile: String,
    thumbnail_title: String,
    thumbnail_description: String,
    thumbnail_tag: String,
    thumbnail_desktop: String,
    thumbnail_mobile: String,
    banner_name: String,
    banner_tag: [String],
    banner_desktop: String,
    banner_mobile: String,
    headline: String,
    sub_headline: String,
    banner_description: String,
    video_desktop: String,
    video_mobile: String,
    hide_class: Boolean,
    current_index: Number,
    classes: [
      {
        class_name: String,
        duration: String,
        class_description: String,
        class_photo: String,
      },
    ],
    first_gallery: String,
    second_gallery: String,
    third_gallery: String,
    fourth_gallery: String,
    fifth_gallery: String,
    sixth_gallery: String,
  },
  {
    versionKey: false,
  }
);

ServiceSchema.plugin(timestampPlugin);
ServiceSchema.plugin(mongooseLeanVirtuals);
const Service = mongoose.model("service", ServiceSchema, "service");
/** @type {import('mongoose').Model} */
module.exports = Service;
