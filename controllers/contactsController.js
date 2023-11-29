const requestError = require("../helpers/HttpError");
const contacts = require("../models/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contacts.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getById(id);
    if (!result) {
      throw requestError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const result = await contacts.add({ name, email, phone });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
      throw requestError(400);
    }

    const result = await contacts.updateById(id, name, email, phone);

    if (!result) {
      throw requestError(404);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const delContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contacts.deleteById(id);

    if (!contact) {
      throw requestError(404);
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  delContactById,
  updateContactById,
};
