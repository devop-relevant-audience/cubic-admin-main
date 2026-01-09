import { currentISO } from '../utils/time.util';

export const timestampPlugin = function (schema) {
  schema.add({
    createdAt: {
      type: String,
      default: '',
    },
    updatedAt: {
      type: String,
      default: '',
    },
  });
  
  schema.pre('save', function (next) {
    const currentTime = currentISO();
    if (!this.createdAt) {
      this.createdAt = currentTime;
    }
    this.updatedAt = currentTime;
    next();
  });
};

