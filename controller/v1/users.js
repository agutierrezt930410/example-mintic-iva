import User from "../../db/models/user.js";
import bcrypt from "bcrypt";
import _ from "lodash";
const { dbWrapper } = await import("../../db/index.js");
const db = await dbWrapper;
export const getAll = async (req, res) => {
  const users = await db.User.find();
  return res.status(200).json({
    data: users.map((x) => _.omit(x.toObject(), ["password", "__v"])),
  });
};

export const getById = async (req, res) => {
  const user = await db.User.findById(req.params.id);
  return res.status(200).json({
    data: _.omit(user.toObject(), ["password", "__v"]),
  });
};

export const create = async (req, res) => {
  const { name, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    password: encryptedPassword,
    name,
    email,
  });
  await db.user.save();
  return res.status(201).json({
    data: _.omit(user.toObject(), ["password", "__v"]),
  });
};
