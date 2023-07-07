const passport = require("passport");
const router = require("express").Router();
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const hashPwd = async(password) => {
    const salt=await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
};

router.post("/local", passport.authenticate("local"), (req, res, next) => {
  res.json({ user: req.user });
});
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(401).json({ err: "check your information!" });

  const user = await UserModel.findOne({
    email,
    clientId: null,
    provider: null,
  });
  if (user) return res.status(401).json({ err: "user is exsist!" });
  const hashpassword=await hashPwd(password)
  const newUser = new UserModel({ email, password:hashpassword });
  await newUser.save();
  res.status(200).send(newUser);
});
router.post("/local", (req, res) => {
  res.json({ user: req.user });
});
module.exports = router;
