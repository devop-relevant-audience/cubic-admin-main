import mongoose from 'mongoose';
import { timestampPlugin } from '../plugins/timestamp.plugin';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

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

export const Inquiry = mongoose.models.inquiry || mongoose.model('inquiry', InquirySchema, 'inquiry');

