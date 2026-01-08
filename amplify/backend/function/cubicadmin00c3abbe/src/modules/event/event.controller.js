const mongoose = require("mongoose");
const Event = require("./event.model");

const get = async (req, res, next) => {
  try {
    const query = req.query;

    const events = await Event.find({
      ...query.filter,
    })
      .select(query.select)
      .sort(query.sort)
      .limit(query.limit)
      .skip(query.skip)
      .populate(query.populate)
      .lean({ virtuals: true });
    const count = await Event.countDocuments(query.filter);
    return res.status(200).json({
      type: "S",
      message: "Get Success",
      events,
      count,
    });
  } catch (error) {
    console.log("get event error", error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = req.query;
    const event = await Event.findById(id)
      .populate(query.populate)
      .lean({ virtuals: true });
    return res.status(200).json({
      type: "S",
      message: "Get Id Success",
      event,
    });
  } catch (error) {
    console.log("get event by id error", error);
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const query = req.query;
    const event = await Event.findOne({
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
      event,
    });
  } catch (error) {
    console.log("get one event error", error);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const event = new Event(data);
    await event.save();
    return res.status(201).json({
      type: "S",
      _id: event._id,
      message: "Create Success",
    });
  } catch (error) {
    console.log("create event error", error);
    next(error);
  }
};

const createMany = async (req, res, next) => {
  try {
    const data = req.body;
    const events = await Event.insertMany(data.events);
    return res.status(201).json({
      type: "S",
      message: "Create Many Success",
      events,
    });
  } catch (error) {
    console.log("create many event error", error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    await Event.findOneAndUpdate(
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
    console.log("update event error", error);
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    return res.status(200).json({
      type: "S",
      message: "Remove Success",
    });
  } catch (error) {
    console.log("remove event error", error);
    next(error);
  }
};

const count = async (req, res, next) => {
  try {
    const query = req.query;
    const count = await Event.countDocuments(query.filter);
    return res.status(200).json({
      type: "S",
      message: "Count Success",
      count,
    });
  } catch (error) {
    console.log("count event error", error);
    next(error);
  }
};

const distinct = (req, res, next) => {
  try {
    const { filter } = req.query;
    const events = Event.distinct(filter?.field);
    return res.status(200).json({
      type: "S",
      message: "Distinct Success",
      events,
    });
  } catch (error) {
    console.log("distinct event error", error);
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
