const Datastore = require('nedb');
const _ = require('lodash');
const assert = require('assert');
const NeDBStore = require('./NeDBStore');
const path = require('path');

const DATAFILE_PATH = './db/currency.dat';
const db = new Datastore({ filename: path.resolve(__dirname, DATAFILE_PATH), autoload: true });


class CurrencyStore extends NeDBStore {
  validate(currency) {
    assert.notEqual(currency.code, '', 'Currency must have a code.');
  }

  findByCode(code) {
    return this.find({ code });
  }
}

module.exports = new CurrencyStore(db);
