const { Power, Engine } = require('../models/Car/engine');

const saveEngine = async (req, res) => {
  const {
    engine,
    productionStart,
    productionEnd,
    capacity,
    fuelType,
  } = req.body;
  const { kWh, hp } = req.body.power;
  try {
    const powerData = new Power({
      kWh,
      hp,
    });
    const createEngine = new Engine({
      engine,
      productionEnd,
      productionStart,
      capacity,
      fuelType,
    });
    createEngine.power = powerData;
    const result = await createEngine.save();
    res.send(result);
  } catch (error) {
    // TODO: Added Error handler
    console.log(error);
  }
};

module.exports = { saveEngine };
