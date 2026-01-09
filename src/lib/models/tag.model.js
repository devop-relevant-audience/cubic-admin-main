import mongoose from 'mongoose';
import { timestampPlugin } from '../plugins/timestamp.plugin';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

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

export const Tag = mongoose.models.tag || mongoose.model('tag', TagSchema, 'tag');

