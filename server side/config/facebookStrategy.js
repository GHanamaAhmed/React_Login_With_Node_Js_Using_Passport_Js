const FacebookStrategy = require("passport-facebook").Strategy;
const UserModel = require("../models/user");

const passportFacebook = (passport) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "/auth/facebook/callback",
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
module.exports = passportFacebook;
