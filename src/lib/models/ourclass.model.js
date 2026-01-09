import mongoose from 'mongoose';
import { timestampPlugin } from '../plugins/timestamp.plugin';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const OurclassSchema = new mongoose.Schema(
  {
    class_name: String,
    duration: String,
    class_description: String,
    class_photo: String,
  },
  {
    versionKey: false,
  }
);

OurclassSchema.plugin(timestampPlugin);
OurclassSchema.plugin(mongooseLeanVirtuals);

export const Ourclass = mongoose.models.ourclass || mongoose.model('ourclass', OurclassSchema, 'ourclass');

