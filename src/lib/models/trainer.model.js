import mongoose from 'mongoose';
import { timestampPlugin } from '../plugins/timestamp.plugin';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const TrainerSchema = new mongoose.Schema(
  {
    name: String,
    position: String,
    club_location: String,
    spotify_link: String,
    instagram_name: String,
    instagram_link: String,
    description: String,
    trainer_tag: [String],
    workout_type: [String],
    first_credit_icon: String,
    second_credit_icon: String,
    third_credit_icon: String,
    fourth_credit_icon: String,
    first_credentials: String,
    second_credentials: String,
    third_credentials: String,
    fourth_credentials: String,
    photo: [String],
    current_index: Number,
  },
  {
    versionKey: false,
  }
);

TrainerSchema.plugin(timestampPlugin);
TrainerSchema.plugin(mongooseLeanVirtuals);

export const Trainer = mongoose.models.trainer || mongoose.model('trainer', TrainerSchema, 'trainer');

