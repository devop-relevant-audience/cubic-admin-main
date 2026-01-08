const mongoose = require("mongoose");
const Club = require("./club.model");

const get = async (req, res, next) => {
  try {
    const query = req.query;

    const clubs = await Club.find({
      ...query.filter,
    })
      .select(query.select)
      .sort(query.sort)
      .limit(query.limit)
      .skip(query.skip)
      .populate(query.populate)
      .lean({ virtuals: true });
    const count = await Club.countDocuments(query.filter);
    return res.status(200).json({
      type: "S",
      message: "Get Success",
      clubs,
      count,
    });
  } catch (error) {
    console.log("get club error", error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = req.query;
    const club = await Club.findById(id)
      .populate(query.populate)
      .lean({ virtuals: true });
    return res.status(200).json({
      type: "S",
      message: "Get Id Success",
      club,
    });
  } catch (error) {
    console.log("get club by id error", error);
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const query = req.query;
    const club = await Club.findOne({
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
      club,
    });
  } catch (error) {
    console.log("get one club error", error);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const club = new Club(data);
    await club.save();
    return res.status(201).json({
      type: "S",
      _id: club._id,
      message: "Create Success",
    });
  } catch (error) {
    console.log("create club error", error);
    next(error);
  }
};

const createMany = async (req, res, next) => {
  try {
    const data = req.body;
    const clubs = await Club.insertMany(data.clubs);
    return res.status(201).json({
      type: "S",
      message: "Create Many Success",
      clubs,
    });
  } catch (error) {
    console.log("create many club error", error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    await Club.findOneAndUpdate(
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
    console.log("update club error", error);
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Club.findByIdAndDelete(id);
    return res.status(200).json({
      type: "S",
      message: "Remove Success",
    });
  } catch (error) {
    console.log("remove club error", error);
    next(error);
  }
};

const count = async (req, res, next) => {
  try {
    const query = req.query;
    const count = await Club.countDocuments(query.filter);
    return res.status(200).json({
      type: "S",
      message: "Count Success",
      count,
    });
  } catch (error) {
    console.log("count club error", error);
    next(error);
  }
};

const distinct = (req, res, next) => {
  try {
    const { filter } = req.query;
    const clubs = Club.distinct(filter?.field);
    return res.status(200).json({
      type: "S",
      message: "Distinct Success",
      clubs,
    });
  } catch (error) {
    console.log("distinct club error", error);
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
