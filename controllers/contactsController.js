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

    if (Object.keys(req.body).length === 0) {
      throw requestError(400);
    }

    const existingContact = await contacts.getById(id);

    if (!existingContact) {
      throw requestError(404);
    }

    const updatedContact = {
      name: name !== undefined ? name : existingContact.name,
      email: email !== undefined ? email : existingContact.email,
      phone: phone !== undefined ? phone : existingContact.phone,
    };

    const result = await contacts.updateById(id, updatedContact);

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
