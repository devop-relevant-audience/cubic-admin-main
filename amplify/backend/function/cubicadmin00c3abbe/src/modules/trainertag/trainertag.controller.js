const mongoose = require("mongoose");
const Trainertag = require("./trainertag.model");

const get = async (req, res, next) => {
  try {
    const query = req.query;

    const trainertags = await Trainertag.find({
      ...query.filter,
    })
      .select(query.select)
      .sort(query.sort)
      .limit(query.limit)
      .skip(query.skip)
      .populate(query.populate)
      .lean({ virtuals: true });
    const count = await Trainertag.countDocuments(query.filter);
    return res.status(200).json({
      type: "S",
      message: "Get Success",
      trainertags,
      count,
    });
  } catch (error) {
    console.log("get trainertag error", error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = req.query;
    const trainertag = await Trainertag.findById(id)
      .populate(query.populate)
      .lean({ virtuals: true });
    return res.status(200).json({
      type: "S",
      message: "Get Id Success",
      trainertag,
    });
  } catch (error) {
    console.log("get trainertag by id error", error);
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const query = req.query;
    const trainertag = await Trainertag.findOne({
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
      trainertag,
    });
  } catch (error) {
    console.log("get one trainertag error", error);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const trainertag = new Trainertag(data);
    await trainertag.save();
    return res.status(201).json({
      type: "S",
      _id: trainertag._id,
      message: "Create Success",
    });
  } catch (error) {
    console.log("create trainertag error", error);
    next(error);
  }
};

const createMany = async (req, res, next) => {
  try {
    const data = req.body;
    const trainertags = await Trainertag.insertMany(data.trainertags);
    return res.status(201).json({
      type: "S",
      message: "Create Many Success",
      trainertags,
    });
  } catch (error) {
    console.log("create many trainertag error", error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    await Trainertag.findOneAndUpdate(
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
    console.log("update trainertag error", error);
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Trainertag.findByIdAndDelete(id);
    return res.status(200).json({
      type: "S",
      message: "Remove Success",
    });
  } catch (error) {
    console.log("remove trainertag error", error);
    next(error);
  }
};

const count = async (req, res, next) => {
  try {
    const query = req.query;
    const count = await Trainertag.countDocuments(query.filter);
    return res.status(200).json({
      type: "S",
      message: "Count Success",
      count,
    });
  } catch (error) {
    console.log("count trainertag error", error);
    next(error);
  }
};

const distinct = (req, res, next) => {
  try {
    const { filter } = req.query;
    const trainertags = Trainertag.distinct(filter?.field);
    return res.status(200).json({
      type: "S",
      message: "Distinct Success",
      trainertags,
    });
  } catch (error) {
    console.log("distinct trainertag error", error);
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
