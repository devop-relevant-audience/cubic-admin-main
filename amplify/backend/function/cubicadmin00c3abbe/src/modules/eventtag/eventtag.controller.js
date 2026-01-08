const mongoose = require("mongoose");
const Eventtag = require("./eventtag.model");

const get = async (req, res, next) => {
  try {
    const query = req.query;

    const eventtags = await Eventtag.find({
      ...query.filter,
    })
      .select(query.select)
      .sort(query.sort)
      .limit(query.limit)
      .skip(query.skip)
      .populate(query.populate)
      .lean({ virtuals: true });
    const count = await Eventtag.countDocuments(query.filter);
    return res.status(200).json({
      type: "S",
      message: "Get Success",
      eventtags,
      count,
    });
  } catch (error) {
    console.log("get eventtag error", error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = req.query;
    const eventtag = await Eventtag.findById(id)
      .populate(query.populate)
      .lean({ virtuals: true });
    return res.status(200).json({
      type: "S",
      message: "Get Id Success",
      eventtag,
    });
  } catch (error) {
    console.log("get eventtag by id error", error);
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const query = req.query;
    const eventtag = await Eventtag.findOne({
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
      eventtag,
    });
  } catch (error) {
    console.log("get one eventtag error", error);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const eventtag = new Eventtag(data);
    await eventtag.save();
    return res.status(201).json({
      type: "S",
      _id: eventtag._id,
      message: "Create Success",
    });
  } catch (error) {
    console.log("create eventtag error", error);
    next(error);
  }
};

const createMany = async (req, res, next) => {
  try {
    const data = req.body;
    const eventtags = await Eventtag.insertMany(data.eventtags);
    return res.status(201).json({
      type: "S",
      message: "Create Many Success",
      eventtags,
    });
  } catch (error) {
    console.log("create many eventtag error", error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    await Eventtag.findOneAndUpdate(
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
    console.log("update eventtag error", error);
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Eventtag.findByIdAndDelete(id);
    return res.status(200).json({
      type: "S",
      message: "Remove Success",
    });
  } catch (error) {
    console.log("remove eventtag error", error);
    next(error);
  }
};

const count = async (req, res, next) => {
  try {
    const query = req.query;
    const count = await Eventtag.countDocuments(query.filter);
    return res.status(200).json({
      type: "S",
      message: "Count Success",
      count,
    });
  } catch (error) {
    console.log("count eventtag error", error);
    next(error);
  }
};

const distinct = (req, res, next) => {
  try {
    const { filter } = req.query;
    const eventtags = Eventtag.distinct(filter?.field);
    return res.status(200).json({
      type: "S",
      message: "Distinct Success",
      eventtags,
    });
  } catch (error) {
    console.log("distinct eventtag error", error);
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
