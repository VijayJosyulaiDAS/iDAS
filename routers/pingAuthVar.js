module.exports = {

  'pingAuth': {
    authorizationURL: 'https://fedauth.pg.com/as/authorization.oauth2',
    tokenURL: 'https://fedauth.pg.com/as/token.oauth2',
    clientID: 'Predictive Maintenance Goa',
    clientSecret: 'mVL3JilkIAPUuVmbQSRB7V84FmnfILOZ1LFzihzyFwDPmrIt72Ge3H0wtEHwEDqe',
    // callbackURL: 'http://ina942p3f5-w10.clients.pg.com:3008/ping/oauth/callback',
    // callbackURL: 'http://goa.pg.com:3008/ping/oauth/callback',
    callbackURL: 'http://localhost:3004/ping/oauth/callback' //for debug ukp
    // callbackURL: 'http://localhost:4200'
  }
};




