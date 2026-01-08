const mongoose = require("mongoose");
const Service = require("./service.model");

const get = async (req, res, next) => {
  try {
    const query = req.query;

    const services = await Service.find({
      ...query.filter,
    })
      .select(query.select)
      .sort(query.sort)
      .limit(query.limit)
      .skip(query.skip)
      .populate(query.populate)
      .lean({ virtuals: true });
    const count = await Service.countDocuments(query.filter);

    const sortedSerice = services.sort(
      (a, b) => a.current_index - b.current_index
    );

    return res.status(200).json({
      type: "S",
      message: "Get Success",
      services: sortedSerice,
      count,
    });
  } catch (error) {
    console.log("get service error", error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = req.query;
    const service = await Service.findById(id)
      .populate(query.populate)
      .lean({ virtuals: true });
    return res.status(200).json({
      type: "S",
      message: "Get Id Success",
      service,
    });
  } catch (error) {
    console.log("get service by id error", error);
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const query = req.query;
    const service = await Service.findOne({
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
      service,
    });
  } catch (error) {
    console.log("get one service error", error);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;

    const totalService = await Service.countDocuments();

    // const service = new Service(data);

    const service = new Service({
      ...data,
      current_index: totalService + 1,
    });

    await service.save();
    return res.status(201).json({
      type: "S",
      _id: service._id,
      message: "Create Success",
    });
  } catch (error) {
    console.log("create service error", error);
    next(error);
  }
};

const createMany = async (req, res, next) => {
  try {
    const data = req.body;
    const services = await Service.insertMany(data.services);
    return res.status(201).json({
      type: "S",
      message: "Create Many Success",
      services,
    });
  } catch (error) {
    console.log("create many service error", error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    await Service.findOneAndUpdate(
      {
        _id: id,
      },
      data
    );
    return res.status(200).json({
      type: "S",
      message: "Update Success",
    });
  } catch (error) {
    console.log("update service error", error);
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Service.findByIdAndDelete(id);
    return res.status(200).json({
      type: "S",
      message: "Remove Success",
    });
  } catch (error) {
    console.log("remove service error", error);
    next(error);
  }
};

const count = async (req, res, next) => {
  try {
    const query = req.query;
    const count = await Service.countDocuments(query.filter);
    return res.status(200).json({
      type: "S",
      message: "Count Success",
      count,
    });
  } catch (error) {
    console.log("count service error", error);
    next(error);
  }
};

const distinct = (req, res, next) => {
  try {
    const { filter } = req.query;
    const services = Service.distinct(filter?.field);
    return res.status(200).json({
      type: "S",
      message: "Distinct Success",
      services,
    });
  } catch (error) {
    console.log("distinct service error", error);
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
