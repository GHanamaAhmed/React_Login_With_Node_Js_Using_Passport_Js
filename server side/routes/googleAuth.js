const passport = require("passport");
const { authMiddleware } = require("../middlewares/middlewareAuth");

const router = require("express").Router();
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/profile",
    failureRedirect: "http://localhost:4000/signin",
  })
);
module.exports = router;
