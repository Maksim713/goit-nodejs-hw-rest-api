const express = require("express");

const ctrl = require("../../controllers/auth");

const {
  registerJoiSchema,
  loginJoiSchema,
  emailSchema,
} = require("../../schemas");
const { validateBody, authenticate, upload } = require("../../middlewares");

const router = express.Router();

// signup
router.post("/register", validateBody(registerJoiSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify", validateBody(emailSchema), ctrl.resendVerifyEmail);

// signin
router.post("/login", validateBody(loginJoiSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
