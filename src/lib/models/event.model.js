import mongoose from 'mongoose';
import { timestampPlugin } from '../plugins/timestamp.plugin';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const EventSchema = new mongoose.Schema(
  {
    image: String,
    name: String,
    club: [],
    start_date: String,
    end_date: String,
    time: String,
    thumbnail: String,
  },
  {
    versionKey: false,
  }
);

EventSchema.plugin(timestampPlugin);
EventSchema.plugin(mongooseLeanVirtuals);

export const Event = mongoose.models.event || mongoose.model('event', EventSchema, 'event');

