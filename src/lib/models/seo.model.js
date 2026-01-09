import mongoose from 'mongoose';
import { timestampPlugin } from '../plugins/timestamp.plugin';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const SeoSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    description: String,
  },
  {
    versionKey: false,
  }
);

SeoSchema.plugin(timestampPlugin);
SeoSchema.plugin(mongooseLeanVirtuals);

export const Seo = mongoose.models.seo || mongoose.model('seo', SeoSchema, 'seo');

