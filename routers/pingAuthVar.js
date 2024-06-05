module.exports = {

  'pingAuth': {
    authorizationURL: "https://fedauthtst.pg.com/as/authorization.oauth2",
    tokenURL:"https://fedauthtst.pg.com/as/token.oauth2",
    clientID: "Hrsssolstice",
    clientSecret: "n0f52xI9raIreYk9hf8RX4GmmmD9qnH4wtWAgMUAGSSV8A5MBaJmdYozvF8dYCLR",
    // callbackURL: process.env.PING_CALLBACK_URL,
    callbackURL: "http://localhost:3000/callback",
    userInfoURL: "https://fedauthtst.pg.com/idp/userinfo.openid"
  }
};




