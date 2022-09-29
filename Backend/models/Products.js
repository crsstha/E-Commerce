const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required:true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
      },
    },
  ],
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  size: {
    type: String,
    required: [true, "Please Enter Product Size"],
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        
      },
      name: {
        type: String,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  endAt: {
    type: Date,
  }
  
});
const products = mongoose.model("Products", productSchema);
module.exports = products;
