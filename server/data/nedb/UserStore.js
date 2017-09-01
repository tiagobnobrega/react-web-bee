const Datastore = require('nedb');
const _ = require('lodash');
const assert = require('assert');
const NeDB = require('./NeDBStore');
const path = require('path');

const DATAFILE_PATH = './db/users.dat';
const db = new Datastore({ filename: path.resolve(__dirname, DATAFILE_PATH), autoload: true });

class UserStore extends NeDB {
  // overriding validation
  validate(userArg) {
    const users = _.castArray(userArg);
    users.forEach((us) => {
      assert.notEqual(us.name, '', 'User must have a name!');
    });
  }

  // You may create some custom methods here
}

module.exports = new UserStore(db);
