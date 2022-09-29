const product = require("../models/Products");
const ErrorHander = require("../utils/errorhander");
const ApiFeatures = require("../utils/apifeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");

//Create a Vechicle
exports.addProduct = catchAsyncErrors(async (req, res) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
      extended: true,
      limit: "50mb",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;

  req.body.host = req.user.id;

  const Product = await product.create(req.body);
  res.status(201).json({
    success: true,
    Product,
  });
});

exports.getAllProduct = async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await product.countDocuments();

  try {
    const apiFeature = new ApiFeatures(product.find(), req.query)
      .search()
      .filter();

    let products = await apiFeature.query;

    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage);

    // products = await apiFeature.query;

    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAdminProducts = async (req, res, next) => {
  const Product = await product.find();
  res.status(200).json({
    success: true,
    Product,
  });
};


// Get product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const Product = await product
    .findById(req.params.id)
    .populate("host", "firstName lastName createdAt avatar")
    .populate("reviews.user", "avatar");
  if (!Product) {
    return next(new ErrorHander("Vehicle not found", 404));
  }

  res.status(200).json({
    success: true,
    Product,
  });
});

// Get product Details Update
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let Product = await product.findById(req.params.id);
  if (!Product) {
    return next(new ErrorHander("Vehicle not found", 404));
  }
  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < Product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(Product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  Product = await product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    Product,
  });
});

//Delete vechile
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const Product = await product.findById(req.params.id);

  if (!Product) {
    return next(new ErrorHander("Product not found", 404));
  }

  await Product.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.firstName,
    rating: Number(rating),
    comment,
  };

  const Product = await product.findById(productId);

  const isReviewed = Product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    Product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    Product.reviews.push(review);
    Product.numOfReviews = Vehicle.reviews.length;
  }

  let avg = 0;

  Product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  Product.ratings = avg / Product.reviews.length;

  await Product.save({ validateBeforeSave: false });
  console.log(Product);
  res.status(200).json({
    success: true,
    review,
  });
});

// Get All Reviews of a Vehicle
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const Product = await product.findById(req.query.id);

  if (!Product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: Product.reviews,
  });
});

// Delete Reviews of a Vehicle
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const Product = await product.findById(req.query.productId);

  if (!Product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = Product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
