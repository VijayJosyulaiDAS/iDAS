const OAuth2Strategy = require('passport-ping-oauth2').Strategy;
const configAuth = require('./pingAuthVar');
const util = require("../util");

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
    async function (accessToken, refreshToken, params, profile, done) {
      console.log("accesstoken1", accessToken, "--2--", refreshToken, "--3--", params, "--4--", profile, "--5--", done)
      let existingUser = await util.model.User.findOne({where: {email: profile?.email}})
      let data = {
        name: profile?.FirstName + " " + profile?.LastName,
        email: profile?.email,
        role: existingUser?.role ? existingUser.role : 'user',
        business_unit_name: existingUser?.business_unit_name ? existingUser?.business_unit_name: '' ,
      }
      if (existingUser) {
        return done(null, {accessToken: accessToken, refreshToken: refreshToken, params: params, profile: profile})
      }else{
        await util.model.User.create(data)
        return done(null, {accessToken: accessToken, refreshToken: refreshToken, params: params, profile: profile})
      }
    }));
}



