import mongoose from 'mongoose';
import { timestampPlugin } from '../plugins/timestamp.plugin';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const TrainertagSchema = new mongoose.Schema(
  {
    tag: String,
  },
  {
    versionKey: false,
  }
);

TrainertagSchema.plugin(timestampPlugin);
TrainertagSchema.plugin(mongooseLeanVirtuals);

export const Trainertag = mongoose.models.trainertag || mongoose.model('trainertag', TrainertagSchema, 'trainertag');

