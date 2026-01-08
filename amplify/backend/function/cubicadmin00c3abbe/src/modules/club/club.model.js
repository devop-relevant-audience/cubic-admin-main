const mongoose = require("mongoose");
const { timestampPlugin } = require("../../plugins/time.plugin");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const ClubSchema = new mongoose.Schema(
  {
    location_name: String,
    phone: String,
    postal: String,
    province: String,
    district: String,
    sub_district: String,
    address: String,
    link_map: String,
    sauna_room: Boolean,
    shower_room: Boolean,
    locker_room: Boolean,
    wifi: Boolean,
    refuel_bar: Boolean,
    parking: Boolean,
    photo: [String],
    free_boolean1: Boolean,
    free_boolean2: Boolean,
    free_boolean3: Boolean,
    free_text1: String,
    free_text2: String,
    free_text3: String,
  },
  {
    versionKey: false,
  }
);

ClubSchema.plugin(timestampPlugin);
ClubSchema.plugin(mongooseLeanVirtuals);
const Club = mongoose.model("club", ClubSchema, "club");
/** @type {import('mongoose').Model} */
module.exports = Club;
