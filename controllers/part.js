const {
  CategorySchema,
  SubCategorySchema,
  PartNameSchema,
} = require('../models/Car/category');

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
const getData = async (req, res) => {
  try {
    const data = await Category.findById('5f466880021993e16ff3a59c');
    console.log(data);
    res.send('Success')
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addPart: addPart,
  getData: getData,
};
