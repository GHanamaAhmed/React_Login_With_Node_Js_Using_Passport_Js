const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const compare = async (password, hash) => {
  const salt = await bcrypt.genSalt(10);
  const hashpwd = await bcrypt.hash(password, salt);
  return hashpwd === hash;
};
const passportConfig = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        await UserModel.findOne({ email })
          .then((user) => {
            if (!user) return done(null, false, { msg: "User not found" });
            if (!compare(password, user.password))
              return done(null, fase, { msg: "password not correct!" });
            return done(null, user);
          })
          .catch((err) => {
            done(err);
          });
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    await UserModel.findById(id)
      .then((user) => {
        if (!user) return done(null, false, { msg: "User not found" });
        return done(null, user);
      })
      .catch((err) => {
        done(err);
      });
  });
};
module.exports = passportConfig;
