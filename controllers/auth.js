const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { HttpError, ctrlWrapper } = require("../helpers");

const { DB_HOST } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, DB_HOST, { expiresIn: "23h" });
  const currentUser = await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: { email: currentUser.email, subscription: currentUser.subscription },
  });
};

const getCurrent = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
