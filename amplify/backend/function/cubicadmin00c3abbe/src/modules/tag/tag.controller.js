const mongoose = require("mongoose");
const Tag = require("./tag.model");

const get = async (req, res, next) => {
  try {
    const query = req.query;

    const tags = await Tag.find({
      ...query.filter,
    })
      .select(query.select)
      .sort(query.sort)
      .limit(query.limit)
      .skip(query.skip)
      .populate(query.populate)
      .lean({ virtuals: true });
    const count = await Tag.countDocuments(query.filter);
    return res.status(200).json({
      type: "S",
      message: "Get Success",
      tags,
      count,
    });
  } catch (error) {
    console.log("get tag error", error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = req.query;
    const tag = await Tag.findById(id)
      .populate(query.populate)
      .lean({ virtuals: true });
    return res.status(200).json({
      type: "S",
      message: "Get Id Success",
      tag,
    });
  } catch (error) {
    console.log("get tag by id error", error);
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const query = req.query;
    const tag = await Tag.findOne({
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
      tag,
    });
  } catch (error) {
    console.log("get one tag error", error);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const tag = new Tag(data);
    await tag.save();
    return res.status(201).json({
      type: "S",
      _id: tag._id,
      message: "Create Success",
    });
  } catch (error) {
    console.log("create tag error", error);
    next(error);
  }
};

const createMany = async (req, res, next) => {
  try {
    const data = req.body;
    const tags = await Tag.insertMany(data.tags);
    return res.status(201).json({
      type: "S",
      message: "Create Many Success",
      tags,
    });
  } catch (error) {
    console.log("create many tag error", error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    await Tag.findOneAndUpdate(
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
    console.log("update tag error", error);
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Tag.findByIdAndDelete(id);
    return res.status(200).json({
      type: "S",
      message: "Remove Success",
    });
  } catch (error) {
    console.log("remove tag error", error);
    next(error);
  }
};

const count = async (req, res, next) => {
  try {
    const query = req.query;
    const count = await Tag.countDocuments(query.filter);
    return res.status(200).json({
      type: "S",
      message: "Count Success",
      count,
    });
  } catch (error) {
    console.log("count tag error", error);
    next(error);
  }
};

const distinct = (req, res, next) => {
  try {
    const { filter } = req.query;
    const tags = Tag.distinct(filter?.field);
    return res.status(200).json({
      type: "S",
      message: "Distinct Success",
      tags,
    });
  } catch (error) {
    console.log("distinct tag error", error);
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
