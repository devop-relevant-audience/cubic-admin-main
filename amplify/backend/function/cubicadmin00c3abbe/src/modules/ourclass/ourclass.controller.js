const mongoose = require("mongoose");
const Ourclass = require("./ourclass.model");

const get = async (req, res, next) => {
  try {
    const query = req.query;

    const ourclasses = await Ourclass.find({
      ...query.filter,
    })
      .select(query.select)
      .sort(query.sort)
      .limit(query.limit)
      .skip(query.skip)
      .populate(query.populate)
      .lean({ virtuals: true });
    const count = await Ourclass.countDocuments(query.filter);
    return res.status(200).json({
      type: "S",
      message: "Get Success",
      ourclasses,
      count,
    });
  } catch (error) {
    console.log("get ourclass error", error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = req.query;
    const ourclass = await Ourclass.findById(id)
      .populate(query.populate)
      .lean({ virtuals: true });
    return res.status(200).json({
      type: "S",
      message: "Get Id Success",
      ourclass,
    });
  } catch (error) {
    console.log("get ourclass by id error", error);
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const query = req.query;
    const ourclass = await Ourclass.findOne({
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
      ourclass,
    });
  } catch (error) {
    console.log("get one ourclass error", error);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const ourclass = new Ourclass(data);
    await ourclass.save();
    return res.status(201).json({
      type: "S",
      _id: ourclass._id,
      message: "Create Success",
    });
  } catch (error) {
    console.log("create ourclass error", error);
    next(error);
  }
};

const createMany = async (req, res, next) => {
  try {
    const data = req.body;
    const ourclasses = await Ourclass.insertMany(data.ourclasses);
    return res.status(201).json({
      type: "S",
      message: "Create Many Success",
      ourclasses,
    });
  } catch (error) {
    console.log("create many ourclass error", error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    await Ourclass.findOneAndUpdate(
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
    console.log("update ourclass error", error);
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Ourclass.findByIdAndDelete(id);
    return res.status(200).json({
      type: "S",
      message: "Remove Success",
    });
  } catch (error) {
    console.log("remove ourclass error", error);
    next(error);
  }
};

const count = async (req, res, next) => {
  try {
    const query = req.query;
    const count = await Ourclass.countDocuments(query.filter);
    return res.status(200).json({
      type: "S",
      message: "Count Success",
      count,
    });
  } catch (error) {
    console.log("count ourclass error", error);
    next(error);
  }
};

const distinct = (req, res, next) => {
  try {
    const { filter } = req.query;
    const ourclasses = Ourclass.distinct(filter?.field);
    return res.status(200).json({
      type: "S",
      message: "Distinct Success",
      ourclasses,
    });
  } catch (error) {
    console.log("distinct ourclass error", error);
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
