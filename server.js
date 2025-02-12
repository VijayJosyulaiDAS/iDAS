const log4js = require('log4js')
    , express = require("express")
    , bodyParser = require("body-parser")
    , session = require('express-session')
    , cors = require("cors")
    , db = require("./connection/sql_connection").sequelize
    , app = express()
    , modelInit = require("./models-init/init")
    , swaggerUi = require('swagger-ui-express')
    , swaggerJsdoc = require('./swagger_output.json')
    , docSwag = require('./api-docs/swaggerOptions')
    , compression = require('compression')
    ,passport = require('passport')
    ,flash = require('connect-flash')
    , dir = './build'
    ,path = require('path')
    , indexDir = '/build/index.html'
      require('dotenv').config()
const morgan = require('morgan');

// Use compression middleware
app.use(compression());

// Enable CORS for all router
app.use(cors());

// Create a logger instance
const log = log4js.getLogger('app');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse application/json
app.use(bodyParser.json());

//api logger
app.use(morgan('dev'));

modelInit.utils(db).then(r => console.log("Table initialize successfully"))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));

app.use(session({
  secret: 'tutorialsecret',
  cookie: {
    secure: false
  },
  saveUninitialized: true,
  resave: false,   
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routers/ping-auth')(passport);
require('./routers/routes')(app, passport);
require('./router/routes')(app);

app.use(express.static(path.join(__dirname, dir)));

app.use((req, res) => {
    res.sendFile(path.join(__dirname + indexDir));
});

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
