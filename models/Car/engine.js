const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const powerSchema = new Schema({
  kWh: {
    type: Number,
    required: true,
  },
  hp: {
    type: Number,
    required: true,
  },
});

const engineSchema = new Schema(
  {
    engine: {
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
    models: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Model',
      },
    ],
    power: {
      type: powerSchema,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      enum: [
        'diesel',
        'gasoline',
        'gasoline_gas',
        'gasoline_electricity',
        'electricity',
        'diesel_electricity',
        'diesel_gas',
        'bioethanol',
        'other',
      ],
      required: true,
    },
    cars: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Car',
      },
    ],
  },
  { timestamps: true }
);

engineSchema.method('engineFullName', function () {
  return `${this.engine} (${this.productionStart} - ${this.productionEnd})`;
});

module.exports = {
  Engine: mongoose.model('Engine', engineSchema),
  Power: mongoose.model('Power', powerSchema),
};
