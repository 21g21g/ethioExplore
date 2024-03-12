const asyncHandler = require("express-async-handler");
const Package = require("../models/packageModel");

exports.createPackage = asyncHandler(async (req, res) => {
  const {
    name,
    guides,
    price,
    duration,
    createdBy,
    description,
    location,
    category,
    priceDiscount,
  } = req.body;

  const newPackage = await Package.create({
    name,
    guides,
    price,
    duration,
    createdBy,
    description,
    location,
    category,
    priceDiscount,
  });
  
  res.status(201).json({
    status: "success",
    data: {
      newPackage,
    },
  });
});

exports.getPackages = asyncHandler(async (req, res) => {
  const packages = await Package.find();
  res.status(200).json({
    status: "success",
    data: {
      packages,
    },
  });

  res.status(404).json({
    status: "fail",
    message: err.message,
  });
});

exports.getPackage = asyncHandler(async (req, res) => {
  const package = await Package.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      package,
    },
  });

  res.status(404).json({
    status: "fail",
    message: err.message,
  });
});
exports.deletePackage = asyncHandler(async (req, res) => {
  const packageId = req.params.id;

  const deletedPackage = await Package.findByIdAndDelete(packageId);
  if (!deletedPackage) {
    return res.status(404).json({
      status: "fail",
      message: "Package not found",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
exports.updatePackage = asyncHandler(async (req, res) => {
  const packageId = req.params.id;

  const updatedPackage = await Package.findByIdAndUpdate(
    packageId,
    req.body,
    { new: true }
  );

  if (!updatedPackage) {
    return res.status(404).json({
      status: "fail",
      message: "Package not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      package: updatedPackage,
    },
  });
});
