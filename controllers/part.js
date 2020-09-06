const Part = require('../models/Car/part.js');
const { Category } = require('../models/Car/category.js');

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

//TODO: For test, delete if no more needed
const getCat = async (req, res) => {
  try {
    const data = await Category.find({});
    res.send(data)
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addPart: addPart,
  getCat: getCat,
};
