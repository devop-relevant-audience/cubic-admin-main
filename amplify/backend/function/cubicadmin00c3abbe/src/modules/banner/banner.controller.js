const mongoose = require("mongoose");
const Banner = require("./banner.model");

const get = async (req, res, next) => {
  try {
    const query = req.query;

    const banners = await Banner.find({
      ...query.filter,
    })
      .select(query.select)
      .sort(query.sort)
      .limit(query.limit)
      .skip(query.skip)
      .populate(query.populate)
      .lean({ virtuals: true });
    const count = await Banner.countDocuments(query.filter);
    return res.status(200).json({
      type: "S",
      message: "Get Success",
      banners,
      count,
    });
  } catch (error) {
    console.log("get banner error", error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = req.query;
    const banner = await Banner.findById(id)
      .populate(query.populate)
      .lean({ virtuals: true });
    return res.status(200).json({
      type: "S",
      message: "Get Id Success",
      banner,
    });
  } catch (error) {
    console.log("get banner by id error", error);
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const query = req.query;
    const banner = await Banner.findOne({
      ...query.filter,
    })
      .select(query.select)
      .sort(query.sort)
      .limit(query.limit)
      .skip(query.skip)
      .populate(query.populate)
      .lean({ virtuals: true });
    return res.status(200).json({
      type: "S",
      message: "Get One Success",
      banner,
    });
  } catch (error) {
    console.log("get one banner error", error);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const banner = new Banner(data);
    await banner.save();
    return res.status(201).json({
      type: "S",
      _id: banner._id,
      message: "Create Success",
    });
  } catch (error) {
    console.log("create banner error", error);
    next(error);
  }
};

const createMany = async (req, res, next) => {
  try {
    const data = req.body;
    const banners = await Banner.insertMany(data.banners);
    return res.status(201).json({
      type: "S",
      message: "Create Many Success",
      banners,
    });
  } catch (error) {
    console.log("create many banner error", error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    await Banner.findOneAndUpdate(
      {
        _id: id,
      },
      data,
    );
    return res.status(200).json({
      type: "S",
      message: "Update Success",
    });
  } catch (error) {
    console.log("update banner error", error);
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Banner.findByIdAndDelete(id);
    return res.status(200).json({
      type: "S",
      message: "Remove Success",
    });
  } catch (error) {
    console.log("remove banner error", error);
    next(error);
  }
};

const count = async (req, res, next) => {
  try {
    const query = req.query;
    const count = await Banner.countDocuments(query.filter);
    return res.status(200).json({
      type: "S",
      message: "Count Success",
      count,
    });
  } catch (error) {
    console.log("count banner error", error);
    next(error);
  }
};

const distinct = (req, res, next) => {
  try {
    const { filter } = req.query;
    const banners = Banner.distinct(filter?.field);
    return res.status(200).json({
      type: "S",
      message: "Distinct Success",
      banners,
    });
  } catch (error) {
    console.log("distinct banner error", error);
    next(error);
  }
};

module.exports = {
  get,
  getById,
  getOne,
  create,
  createMany,
  update,
  remove,
  count,
  distinct,
};
