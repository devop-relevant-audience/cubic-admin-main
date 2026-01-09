import mongoose from 'mongoose';
import { timestampPlugin } from '../plugins/timestamp.plugin';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

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

export const Banner = mongoose.models.banner || mongoose.model('banner', BannerSchema, 'banner');

