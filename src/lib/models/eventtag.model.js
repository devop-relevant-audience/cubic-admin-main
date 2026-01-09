import mongoose from 'mongoose';
import { timestampPlugin } from '../plugins/timestamp.plugin';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const EventtagSchema = new mongoose.Schema(
  {
    tag: String,
  },
  {
    versionKey: false,
  }
);

EventtagSchema.plugin(timestampPlugin);
EventtagSchema.plugin(mongooseLeanVirtuals);

export const Eventtag = mongoose.models.eventtag || mongoose.model('eventtag', EventtagSchema, 'eventtag');

