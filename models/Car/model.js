const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const modelSchema = new Schema({
  make: {
    makeID: {
      type: Schema.Types.ObjectId,
      ref: 'Make',
    },
    makeName: {
      type: String,
      required: true,
    },
  },
  model: {
    type: String,
    required: true,
  },
  productionStart: {
    type: String,
    required: true,
  },
  productionEnd: {
    type: String,
    required: true,
  },
  engines: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Engine',
    },
  ],
  cars: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Car',
    },
  ],
});

modelSchema.method('getModelFullName', function () {
  return `${this.make.makeName} ${this.model} (${this.productionStart} - ${this.productionEnd})`;
});

module.exports = mongoose.model('Model', modelSchema);
