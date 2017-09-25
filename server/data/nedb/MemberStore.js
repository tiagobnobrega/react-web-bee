/**
 * Store de projetos.
 */
const Datastore = require('nedb');
const _ = require('lodash');
const assert = require('assert');
const NeDB = require('./NeDBStore');
const path = require('path');

const DATAFILE_PATH = './db/members.dat';
const db = new Datastore({ filename: path.resolve(__dirname, DATAFILE_PATH), autoload: true });

class MemberStore extends NeDB {
  // overriding validation
  validate(arg) {
    const members = _.castArray(arg);
    members.forEach((el) => {
      assert.notEqual(el.login, '', 'Member must have a login');
      assert.notEqual(el.name, '', 'Member must have a name');
    });
  }

  findByName(name) {
    return this.find({ name });
  }

}

module.exports = new MemberStore(db);
