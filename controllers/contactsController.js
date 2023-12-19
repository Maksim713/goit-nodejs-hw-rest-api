const requestError = require("../helpers");
const Contact = require("../models/contact");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
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
    const result = await Contact.create(req.body);

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

    const existingContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });

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
    const contact = await Contact.findByIdAndDelete(id);

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

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "missing field favorite" });
    }

    const existingContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });

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
