module.exports = {

  'pingAuth': {
    authorizationURL: "https://fedauthtst.pg.com/as/authorization.oauth2",
    tokenURL:"https://fedauthtst.pg.com/as/token.oauth2",
    clientID: "iDAS",
    clientSecret: "WfjHwGhrK3J8nCPlTp7XTVUZKaAHKaQBN5fmMlnea87tHk4Tjrz0O9Qj9ExvNacG",
    // callbackURL: process.env.PING_CALLBACK_URL,
    callbackURL: "http://localhost:3000/callback",
    userInfoURL: "https://fedauthtst.pg.com/idp/userinfo.openid"
  }
};




