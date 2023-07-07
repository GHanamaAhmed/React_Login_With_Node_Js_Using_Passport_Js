const passport = require("passport");
const { authMiddleware } = require("../middlewares/middlewareAuth");
const router = require("express").Router();

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["user_friends", "manage_pages"],
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "http://localhost:5173/profile",
    failureRedirect: "http://localhost:5173/signin",
  })
);
module.exports = router;
