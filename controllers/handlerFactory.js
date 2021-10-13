const cloud = require("../startup/cloudinary");
const fs = require("fs");

exports.getAll = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.find();
    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};

exports.getOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc)
      return res.status(404).json("Document with the given ID not found");

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};

exports.addOne = (Model, validation) => async (req, res, next) => {
  try {
    if (validation) {
      const { error } = validation(req.body);
      if (error) return res.status(400).json(error.details[0].message);
    }

    let doc;
    if (req.body.email) {
      doc = await Model.findOne({ email: req.body.email });
      if (doc)
        return res
          .status(400)
          .json("Document with the same email already exists");

      let img;
      if (req.files.length !== 0) {
        img = await cloud.cloudUpload(req.files[0].path);
        req.body.image = img.image;
      }

      req.body.city = req.params.cityId;
      doc = new Model({
        ...req.body,
        location: { coordinates: [req.body.lng, req.body.lat] },
      });
      await doc.save();

      if (req.files.length !== 0) fs.unlinkSync(req.files[0].path);
      return res.status(201).json(doc);
    }

    doc = await Model(req.body).save();
    res.status(201).json(doc);
  } catch (error) {
    next(error);
  }
};

exports.updateOne = (Model) => async (req, res, next) => {
  try {
    let doc = await Model.findById(req.params.id);
    if (!doc)
      return res.status(404).json("Document with the given ID not found");

    if (req.files) {
      let img;
      if (req.files.length !== 0) {
        img = await cloud.cloudUpload(req.files[0].path);
        req.body.image = img.image;
      }
      delete req.body.city;

      await doc
        .set({
          ...req.body,
          location: {
            coordinates: [
              req.body.lng ? req.body.lng : doc.location.coordinates[0],
              req.body.lat ? req.body.lat : doc.location.coordinates[1],
            ],
          },
        })
        .save();

      if (req.files.length !== 0) fs.unlinkSync(req.files[0].path);
      return res.status(200).json(doc);
    }

    await doc.set(req.body).save();
    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};

exports.deleteOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) return res.status(404).json("Document already not exist!!");

    await doc.delete();
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
