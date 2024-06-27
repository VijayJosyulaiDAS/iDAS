const Base64 =  require('crypto-js/enc-base64');
const HmacSHA256 = require('crypto-js/hmac-sha256');
const Utf8 = require('crypto-js/enc-utf8');
const jwtDecode = require("jwt-decode");
const util = require("../util");
const {sequelize} = require("../connection/sql_connection");
const jwtSecret = 'some-secret-code-goes-here';

function base64url(source) {
	// Encode in classical base64
	let encodedSource = Base64.stringify(source);

	// Remove padding equal characters
	encodedSource = encodedSource.replace(/=+$/, '');

	// Replace characters according to base64url specifications
	encodedSource = encodedSource.replace(/\+/g, '-');
	encodedSource = encodedSource.replace(/\//g, '_');

	// Return the base64 encoded string
	return encodedSource;
}

function generateJWTToken(tokenPayload) {
	// Define token header
	const header = {
		alg: 'HS256',
		typ: 'JWT'
	};

	// Calculate the issued at and expiration dates
	const date = new Date();
	const iat = Math.floor(date.getTime() / 1000);
	const exp = Math.floor(date.setDate(date.getDate() + 7) / 1000);

	// Define token payload
	const payload = {
		iat,
		iss: 'sidd',
		exp,
		...tokenPayload
	};

	// Stringify and encode the header
	const stringifiedHeader = Utf8.parse(JSON.stringify(header));
	const encodedHeader = base64url(stringifiedHeader);

	// Stringify and encode the payload
	const stringifiedPayload = Utf8.parse(JSON.stringify(payload));
	const encodedPayload = base64url(stringifiedPayload);

	// Sign the encoded header and mock-api
	let signature = `${encodedHeader}.${encodedPayload}`;
	// @ts-ignore
	signature = HmacSHA256(signature, jwtSecret);
	// @ts-ignore
	signature = base64url(signature);

	// Build and return the token
	return `${encodedHeader}.${encodedPayload}.${signature}`;
}

function verifyJWTToken(token) {
	// Split the token into parts
	const parts = token.split('.');
	const header = parts[0];
	const payload = parts[1];
	const signature = parts[2];

	// Re-sign and encode the header and payload using the secret
	const signatureCheck = base64url(HmacSHA256(`${header}.${payload}`, jwtSecret));

	// Verify that the resulting signature is valid
	return signature === signatureCheck;
}

module.exports = (app, passport) => {
    // route for signing in
    app.get('/api/ping/oauth2', passport.authenticate('oauth2', {
        scope: ['openid', 'profile', 'email', 'pingid'],
        pfidpadapterid: "Oauth"
    }), (req, res) => {
        if (req.isAuthenticated()) {
            res.json({ message: 'Authentication successful', user: req.user });
        } else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    });


    app.get('/callback', passport.authenticate('oauth2', {failureRedirect: '/sign-in'}), function (req, res) {
      console.log("user data", req.user);
      res.cookie("_ping_access_token", req.user.accessToken, { httpOnly: true });
      res.cookie("_ping_refresh_token", req.user.refreshToken, { httpOnly: true });
      res.redirect('/sign-in?_x='+encodeURIComponent(req.user.profile.jti))  
    });
  
    app.get('/api/logout', function (req, res) {
      console.log('###### logout route called ######')
      req.logout();
      res.redirect('/sign-in');
    });

    app.get('/api/is_logged_in', (req, res) => {
        console.log('requested user in auth api')
        let triggerValue = req.isAuthenticated()
        res.status(200).json({trigger: triggerValue,user: req.user})
    })

    app.post('/api/is_logged_in', (req, res) => {
      console.log('requested user in auth api')
      let triggerValue = req.isAuthenticated()
      res.status(200).json({trigger: triggerValue, user: req.user})
    });

    app.post('/api/auth/sign-in', async (req, res) => {
        let {profile} = req.user;
        let token = generateJWTToken({id: profile.email})
        let {params} = req.user
        let data = jwtDecode(params.access_token);
        let existingUser = await sequelize.query(`SELECT * FROM [dbo].[tbl_user] where email = '${profile.email}'`, {
            type: sequelize.QueryTypes.SELECT,
        });
        let user = {
            uid: profile.email,
            role: existingUser[0].role ? existingUser[0].role : 'user',
            data: {
                displayName: profile?.FirstName + " " + profile?.LastName,
                photoURL: profile?.FirstName[0],
                business_unit_name: existingUser[0].business_unit_name ? existingUser[0].business_unit_name : '',
                email: profile?.email,
                loginRedirectUrl: '/home',
            }
        };
        res.send({user: user, access_token: token})
    });

    app.post('/api/auth/sign-out', (req, res) => {
      console.log('axios post ')
      res.clearCookie('connect.sid');  
      
      req.logOut(function(err) {
        console.log(err)
        res.redirect('/sign-in?logout=true&time'+encodeURIComponent(new Date().toISOString())); //
      });
    });

  };
  
