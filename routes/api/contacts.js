const express = require("express");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  delContactById,
  patchFavoriteById,
} = require("../../controllers/contactsController");
const { contactJoiSchema, updateFavoriteJoiSchema } = require("../../schemas");

const router = express.Router();

router.get("/", authenticate, getAllContacts);

router.get("/:id", authenticate, isValidId, getContactById);

router.post("/", authenticate, validateBody(contactJoiSchema), addContact);

router.put("/:id", authenticate, isValidId, updateContactById);

router.delete("/:id", authenticate, isValidId, delContactById);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteJoiSchema),
  patchFavoriteById
);

module.exports = router;
