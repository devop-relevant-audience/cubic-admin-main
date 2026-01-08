const mongoose = require("mongoose");
const Inquiry = require("./inquiry.model");

const get = async (req, res, next) => {
  try {
    const query = req.query;

    const inquiries = await Inquiry.find({
      ...query.filter,
    })
      .select(query.select)
      .sort(query.sort)
      .limit(query.limit)
      .skip(query.skip)
      .populate(query.populate)
      .lean({ virtuals: true });
    const count = await Inquiry.countDocuments(query.filter);
    return res.status(200).json({
      type: "S",
      message: "Get Success",
      inquiries,
      count,
    });
  } catch (error) {
    console.log("get inquiry error", error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = req.query;
    const inquiry = await Inquiry.findById(id)
      .populate(query.populate)
      .lean({ virtuals: true });
    return res.status(200).json({
      type: "S",
      message: "Get Id Success",
      inquiry,
    });
  } catch (error) {
    console.log("get inquiry by id error", error);
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const query = req.query;
    const inquiry = await Inquiry.findOne({
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
      inquiry,
    });
  } catch (error) {
    console.log("get one inquiry error", error);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const inquiry = new Inquiry(data);
    await inquiry.save();
    return res.status(201).json({
      type: "S",
      _id: inquiry._id,
      message: "Create Success",
    });
  } catch (error) {
    console.log("create inquiry error", error);
    next(error);
  }
};

const createMany = async (req, res, next) => {
  try {
    const data = req.body;
    const inquiries = await Inquiry.insertMany(data.inquiries);
    return res.status(201).json({
      type: "S",
      message: "Create Many Success",
      inquiries,
    });
  } catch (error) {
    console.log("create many inquiry error", error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    await Inquiry.findOneAndUpdate(
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
    console.log("update inquiry error", error);
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Inquiry.findByIdAndDelete(id);
    return res.status(200).json({
      type: "S",
      message: "Remove Success",
    });
  } catch (error) {
    console.log("remove inquiry error", error);
    next(error);
  }
};

const count = async (req, res, next) => {
  try {
    const query = req.query;
    const count = await Inquiry.countDocuments(query.filter);
    return res.status(200).json({
      type: "S",
      message: "Count Success",
      count,
    });
  } catch (error) {
    console.log("count inquiry error", error);
    next(error);
  }
};

const distinct = (req, res, next) => {
  try {
    const { filter } = req.query;
    const inquiries = Inquiry.distinct(filter?.field);
    return res.status(200).json({
      type: "S",
      message: "Distinct Success",
      inquiries,
    });
  } catch (error) {
    console.log("distinct inquiry error", error);
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
