module.exports = {

  // 'pingAuth': {
  //   authorizationURL: process.env.PING_AUTHORIZATION_URL,
  //   tokenURL: process.env.PING_TOKEN_URL,
  //   clientID: process.env.PING_CLIENT_ID,
  //   clientSecret: process.env.PING_CLIENT_SECRET,
  //   callbackURL: process.env.PING_CALLBACK_URL,
  //   userInfoURL: process.env.PING_USERINFO_URL
  // }
  'pingAuth': {
    authorizationURL: "https://fedauthtst.pg.com/as/authorization.oauth2",
    tokenURL:"https://fedauthtst.pg.com/as/token.oauth2",
    clientID: "iDAS",
    clientSecret: "WfjHwGhrK3J8nCPlTp7XTVUZKaAHKaQBN5fmMlnea87tHk4Tjrz0O9Qj9ExvNacG",
    // callbackURL: process.env.PING_CALLBACK_URL,
    callbackURL: "http://localhost:3000/callback",
    // callbackURL: "https://idaswebapp-webkj4-qa-web.azurewebsites.net/callback",
    userInfoURL: "https://fedauthtst.pg.com/idp/userinfo.openid"
  }
};




