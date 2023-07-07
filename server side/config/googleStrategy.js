const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserModel = require("../models/user");

const passportGoogle = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_SECRET,
        clientSecret: process.env.GOOGLE_CLIENT_ID,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        let user = await UserModel.findOne({
          clientId: profile.id,
          provider: profile.provider,
        });
        if (!user) {
          user = new UserModel({
            email: profile.emails[0].value,
            clientId: profile.id,
            provider: profile.provider,
          });
          await user.save();
        }
        done(null, user);
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    await UserModel.findById(id)
      .then((user) => {
        if (!user) return done(null, false);
        return done(null, user);
      })
      .then((err) => {
        done(err);
      });
  });
};
module.exports = passportGoogle;
