const OAuth2Strategy = require('passport-ping-oauth2').Strategy;
const configAuth = require('./pingAuthVar');

module.exports = (passport) => {
  // serialize

  passport.serializeUser(function (user, done) {
    console.log('---user-----', user)
    done(null, user);
  });

  // deserialize
  passport.deserializeUser(async function (id, done) {
    try {
      console.log('--<id>---', id)
      done(null, id)
    } catch (err) {
      done(err, null);
    }
  });

  passport.use(new OAuth2Strategy({
    authorizationURL: configAuth.pingAuth.authorizationURL,
    tokenURL: configAuth.pingAuth.tokenURL,
    clientID: configAuth.pingAuth.clientID,
    clientSecret: configAuth.pingAuth.clientSecret,
    callbackURL: configAuth.pingAuth.callbackURL
    }, 
    function (accessToken, refreshToken, params, profile, done) {
      console.log("accesstoken1", accessToken, "--2--", refreshToken, "--3--", params, "--4--", profile, "--5--", done)
      return done(null, {accessToken: accessToken, refreshToken: refreshToken, params: params, profile: profile}
        );
    }));
}



