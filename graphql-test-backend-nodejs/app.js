const express = require('express');
const nocache = require('nocache');
const bodyParser = require('body-parser');
var path = require('path');
global.CONFIG = require('./config');
global.app = express();
app.use(nocache());
app.use(express.json({ limit: '50mb' }));

app.use("/images", express.static(path.join(__dirname, 'images')));
app.all('*', function (req, res, next) {
  // var allowedOrigins = CONFIG.allowedOrigins  //allowed origins only allowed to access
  // var origin = req.headers.origin;
  // console.log(origin)
  // console.log(allowedOrigins)

  // if (allowedOrigins.indexOf(origin) > -1) {
  //   res.setHeader('Access-Control-Allow-Origin', origin);
  // } else {
  //   return;
  // }
  // var responseSettings = {
  //   "AccessControlAllowOrigin": req.headers.origin,
  //   "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name",
  //   "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
  //   "AccessControlAllowCredentials": true
  // };

  // res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
  // res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
  // res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);
  // if ('OPTIONS' == req.method) {
  //   res.send(200);
  // }
  // else {
    next();
  // }
});
// Graph-QL configuration
const graphqlUploadExpress = require('graphql-upload');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./schema.js');
const resolver = require('./resolver.js');
const root = {
  Upload: graphqlUploadExpress,
  getAgents: resolver.getAgents,
  addAgents: resolver.addAgents,
}
app.use('/graphql',bodyParser.json(),
    graphqlExpress({
    schema: schema.schema,
    rootValue: root,
    graphiql: true
  })
)

// Database Connection 
var sequelize = require('./db');
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
app.listen(CONFIG.port, () => console.log('Non SSL - App listening on port ' + CONFIG.port));