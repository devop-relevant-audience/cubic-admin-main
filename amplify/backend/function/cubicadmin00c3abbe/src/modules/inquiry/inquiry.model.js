const mongoose = require("mongoose");
const { timestampPlugin } = require("../../plugins/time.plugin");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const InquirySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    message: String,
  },
  {
    versionKey: false,
  }
);

InquirySchema.plugin(timestampPlugin);
InquirySchema.plugin(mongooseLeanVirtuals);
const Inquiry = mongoose.model("inquiry", InquirySchema, "inquiry");
/** @type {import('mongoose').Model} */
module.exports = Inquiry;
