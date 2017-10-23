/* eslint no-underscore-dangle: 0 */ // needs this for mongo like _id
/**
 * Store de projetos.
 */
const Datastore = require('nedb');
const _ = require('lodash');
const assert = require('assert');
const NeDB = require('./NeDBStore');
const path = require('path');

const DATAFILE_PATH = './db/newstore.dat';
const db = new Datastore({ filename: path.resolve(__dirname, DATAFILE_PATH), autoload: true });

class ProjectStore extends NeDB {
  validate() {
    return true;
  }
}

module.exports = new ProjectStore(db);
