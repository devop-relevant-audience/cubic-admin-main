const mongoose = require("mongoose");
const Trainer = require("./trainer.model");

const get = async (req, res, next) => {
  try {
    const query = req.query;

    const filter = query.filter ? { ...query.filter } : {};

    if (query.searchText) {
      const searchRegex = { $regex: query.searchText, $options: "i" };

      filter.$or = [
        { name: searchRegex },
        { trainer_tag: { $elemMatch: searchRegex } }, // Search in the array field
      ];
    }

    const trainers = await Trainer.find(filter)
      .select(query.select)
      .sort(query.sort)
      .limit(query.limit)
      .skip(query.skip)
      .populate(query.populate)
      .lean({ virtuals: true });
    const count = await Trainer.countDocuments(query.filter);

    const sortedTrainers = trainers.sort(
      (a, b) => a.current_index - b.current_index
    );

    return res.status(200).json({
      type: "S",
      message: "Get Success",
      trainers: sortedTrainers,
      count,
    });
  } catch (error) {
    console.log("get trainer error", error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = req.query;
    const trainer = await Trainer.findById(id)
      .populate(query.populate)
      .lean({ virtuals: true });
    return res.status(200).json({
      type: "S",
      message: "Get Id Success",
      trainer,
    });
  } catch (error) {
    console.log("get trainer by id error", error);
    next(error);
  }
};

//Check in field trainer_tag and get most popular tag

const getPoularTag = async (req, res, next) => {
  try {
    const topTags = await Trainer.aggregate([
      { $unwind: "$trainer_tag" }, // Flatten trainer_tag array
      { $group: { _id: "$trainer_tag", count: { $sum: 1 } } }, // Count occurrences
      { $sort: { count: -1 } }, // Sort by most frequent
      { $limit: 5 }, // Limit to top 5
    ]);

    return res.status(200).json({
      type: "S",
      message: "Top 5 Popular Tags",
      tags: topTags,
    });
  } catch (error) {
    console.log("get popular tag error", error);
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const query = req.query;
    const trainer = await Trainer.findOne({
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
      trainer,
    });
  } catch (error) {
    console.log("get one trainer error", error);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;

    const totalTrainer = await Trainer.countDocuments();

    const trainer = new Trainer({
      ...data,
      current_index: totalTrainer + 1, // Set current_index to the next available index
    });
    await trainer.save();
    return res.status(201).json({
      type: "S",
      _id: trainer._id,
      message: "Create Success",
    });
  } catch (error) {
    console.log("create trainer error", error);
    next(error);
  }
};

const createMany = async (req, res, next) => {
  try {
    const data = req.body;
    const trainers = await Trainer.insertMany(data.trainers);
    return res.status(201).json({
      type: "S",
      message: "Create Many Success",
      trainers,
    });
  } catch (error) {
    console.log("create many trainer error", error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    await Trainer.findOneAndUpdate(
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
    console.log("update trainer error", error);
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Trainer.findByIdAndDelete(id);
    return res.status(200).json({
      type: "S",
      message: "Remove Success",
    });
  } catch (error) {
    console.log("remove trainer error", error);
    next(error);
  }
};

const count = async (req, res, next) => {
  try {
    const query = req.query;
    const count = await Trainer.countDocuments(query.filter);
    return res.status(200).json({
      type: "S",
      message: "Count Success",
      count,
    });
  } catch (error) {
    console.log("count trainer error", error);
    next(error);
  }
};

const distinct = (req, res, next) => {
  try {
    const { filter } = req.query;
    const trainers = Trainer.distinct(filter?.field);
    return res.status(200).json({
      type: "S",
      message: "Distinct Success",
      trainers,
    });
  } catch (error) {
    console.log("distinct trainer error", error);
    next(error);
  }
};

module.exports = {
  get,
  getById,
  getPoularTag,
  getOne,
  create,
  createMany,
  update,
  remove,
  count,
  distinct,
};
