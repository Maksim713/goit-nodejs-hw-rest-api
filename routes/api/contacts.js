const express = require("express");
const { addSchema } = require("../../schemas/contacts");
const {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  delContactById,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:id", getContactById);

router.post("/", addSchema, addContact);

router.put("/:id", updateContactById);

router.delete("/:id", delContactById);

module.exports = router;
