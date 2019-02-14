const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { sequelizeOptions } = require('../../config');

const basename = path.basename(__filename);
const db = {};

const {
  DB_NAME,
  DB_USER,
  DB_PASS,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  ...sequelizeOptions,
});

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
