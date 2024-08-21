const { usersModel } = require("../models");
const { handleHttpError } = require("../utils/handleHttpError");
const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/HandleJwt");

const createUser = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };

    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false });

    const token = await tokenSign(dataUser);

    const data = {
      user: dataUser,
      token: token,
    };

    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_CREATE_USER: " + e);
  }
};

const loginUser = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await usersModel
      .findOne({ email: req.email })
      .select("password name email role");
    if (!user) {
      handleHttpError(res, "USER_NOT_EXISTS", 404);
      return;
    }
    const hashPassword = user.password;
    const check = await compare(req.password, hashPassword);
    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID", 401);
    }
    user.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSign(user),
      user,
    };
    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_CREATE_USER: " + e);
  }
};

module.exports = { createUser, loginUser };
