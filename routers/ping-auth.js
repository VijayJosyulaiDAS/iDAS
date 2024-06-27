const OAuth2Strategy = require('passport-ping-oauth2').Strategy;
const env = process.env.NODE_ENV || 'development';
const configAuth = require('../config/pingAuthVar')[env];
const util = require("../util");

module.exports = (passport) => {
  // serialize
  passport.serializeUser(function (user, done) {
    console.log('---user-----', user);
    done(null, user);
  });

  // deserialize
  passport.deserializeUser(async function (id, done) {
    try {
      console.log('--<id>---', id);
      done(null, id);
    } catch (err) {
      done(err, null);
    }
  });

  passport.use(new OAuth2Strategy({
          authorizationURL: configAuth.authorizationURL,
          tokenURL: configAuth.tokenURL,
          clientID: configAuth.clientID,
          clientSecret: configAuth.clientSecret,
          callbackURL: configAuth.callbackURL,
          userInfoURL: configAuth.userInfoURL,
        scope: "openid"
      },
      async function (accessToken, refreshToken, params, profile, done) {
        try {
          let existingUser = await util.model.User.findOne({ where: { email: profile?.email } });
          let data = {
            name: profile?.FirstName + " " + profile?.LastName,
            email: profile?.email,
            role: existingUser?.role ? existingUser?.role : 'user',
            business_unit_name: existingUser?.business_unit_name ? existingUser?.business_unit_name : ''
          };

          if (existingUser) {
            return done(null, { accessToken: accessToken, refreshToken: refreshToken, params: params, profile: profile });
          } else {
            await util.model.User.create(data);
            return done(null, { accessToken: accessToken, refreshToken: refreshToken, params: params, profile: profile });
          }
        } catch (error) {
          console.error("Error in OAuth2 strategy callback:", error);
          return done(error, null);
        }
      }));
};

