var sequelize = require('./db');
const { Client } = require('pg')
var fs = require('fs');
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var sequelize = require('./db');
global.CONFIG = require('./config');
var db = {};
fs.readdirSync(__dirname + '/models/')
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js' && file != 'index.js');
    })
    .forEach(file => {
        var model = sequelize['import'](path.join(__dirname + '/models/', file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
sequelize.sync({ force: true }).then(function () {

});
