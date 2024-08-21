const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleHttpError");
const { matchedData } = require("express-validator");
const fs = require("fs");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;
const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};
const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    console.log(id);
    const data = await storageModel.findById(id);
    console.log(data);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};
const createItem = async (req, res) => {
  try {
    const { body, file } = req;
    console.log(body);
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };
    const data = await storageModel.create(fileData);
    res.send({ data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_ITEM");
  }
};
const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataFile = await storageModel.findById(id);
    await storageModel.deleteOne({ _id: id });
    const { filename } = dataFile;
    const filePath = `${MEDIA_PATH}/${filename}`;
    fs.unlinkSync(filePath);

    const data = {
      filePath,
      deleted: 1,
    };
    res.send({ data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = { getItems, getItem, createItem, deleteItem };
