const {
  CategorySchema,
  SubCategorySchema,
  PartNameSchema,
} = require('../models/Car/category');
const Part = require('../models/Car/part.js');

const create_UUID = require('../utils/uuid');

const addPart = async (req, res) => {
  const { body } = req;
  body.productCode = create_UUID();
  try {
    newPart = new Part(body);
    const result = await newPart.save();
    res.send(result);
  } catch (error) {
    // TODO: Added Error Handler
    console.log(error);
  }
};

module.exports = {
  addPart: addPart,
};
