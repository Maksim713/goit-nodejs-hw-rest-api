const express = require("express");
const { contactSchema, contactFavorite } = require("../../schemas");
const isValidId = require("../../middlewares");
const {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  delContactById,
  patchFavoriteById,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:id", isValidId, getContactById);

router.post("/", contactSchema, addContact);

router.put("/:id", isValidId, updateContactById);

router.delete("/:id", isValidId, delContactById);

router.patch("/:id/favorite", isValidId, contactFavorite, patchFavoriteById);

module.exports = router;
