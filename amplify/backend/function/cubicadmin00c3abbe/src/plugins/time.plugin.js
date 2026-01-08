const util = require("../utils/time.util");
const timestampPlugin = function (schema) {
  schema.add({
    createdAt: {
      type: String,
      default: "",
    },
    updatedAt: {
      type: String,
      default: "",
    },
  });
  schema.pre("save", function (next) {
    const currentISO = util.currentISO();
    if (!this.createdAt) {
      this.createdAt = currentISO;
    }
    this.updatedAt = currentISO;
    next();
  });
};
module.exports = {
  timestampPlugin,
};
