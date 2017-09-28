/**
 * Store de projetos.
 */
const Datastore = require('nedb');
const _ = require('lodash');
// const assert = require('assert');
const NeDB = require('./NeDBStore');
const path = require('path');

const DATAFILE_PATH = './db/nova.dat';
const db = new Datastore({ filename: path.resolve(__dirname, DATAFILE_PATH), autoload: true });

class NovaStore extends NeDB {
  // overriding validation
  validate(arg) {
   return true;
  }
}

module.exports = new NovaStore(db);
