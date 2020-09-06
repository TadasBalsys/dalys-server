const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// kategorijos schema

const partNamesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  SubCategory: {
    SubCategoryID: {
      type: Schema.Types.ObjectId,
      ref: 'SubCategory',
    },
    SubCategoryName: {
      type: String,
      required: true,
    },
  },
});

const SubCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    categoryID: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    categoryName: {
      type: String,
      required: true,
    },
  },
  partNames: [partNamesSchema],
});

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  iconUrl: {
    type: String,
    required: true,
  },
  subcategories: [SubCategorySchema],
});

module.exports = {
  Category: mongoose.model('Category', categorySchema),
  SubCategory: mongoose.model('SubCategory', SubCategorySchema),
  PartName: mongoose.model('PartName', partNamesSchema),
  CategorySchema: categorySchema,
  SubCategorySchema: SubCategorySchema,
  PartNameSchema: partNamesSchema,
};
