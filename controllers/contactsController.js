const Contact = require("../models/contacts");
const requestError = require("../helpers");

const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.find({ owner }, "-createdAt -updatedAt");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOne({ _id: id, owner });
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
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, favorite } = req.body;

    if (Object.keys(req.body).length === 0) {
      throw requestError(400);
    }

    const { _id: owner } = req.user;

    const existingContact = await Contact.findOneAndUpdate(
      { _id: id, owner },
      req.body,
      {
        new: true,
      }
    );

    if (!existingContact) {
      throw requestError(404);
    }

    const updatedContact = {
      name: name !== undefined ? name : existingContact.name,
      email: email !== undefined ? email : existingContact.email,
      phone: phone !== undefined ? phone : existingContact.phone,
      favorite: favorite !== undefined ? favorite : existingContact.favorite,
    };

    const result = await Contact.findByIdAndUpdate(id, updatedContact);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const delContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const contact = await Contact.findOneAndDelete({ _id: id, owner });

    if (!contact) {
      throw requestError(404);
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const patchFavoriteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const existingContact = await Contact.findOneAndUpdate(
      { _id: id, owner },
      req.body,
      {
        new: true,
      }
    );

    if (!existingContact) {
      throw requestError(404);
    }

    const result = await Contact.findByIdAndUpdate(id);

    res.status(200).json(result);
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
  patchFavoriteById,
};
