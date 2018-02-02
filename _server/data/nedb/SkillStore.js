/* eslint no-underscore-dangle: 0 */  // needs this for mongo like _id
/**
 * Store de projetos.
 */
const Datastore = require('nedb');
const _ = require('lodash');
const assert = require('assert');
const NeDB = require('./NeDBStore');
const path = require('path');

const DATAFILE_PATH = './db/skill.dat';
const db = new Datastore({ filename: path.resolve(__dirname, DATAFILE_PATH), autoload: true });

class SkillStore extends NeDB {
  // overriding validation
  validate(userArg) {
    const projects = _.castArray(userArg);
    projects.forEach((p) => {
      assert.notEqual(p.title, '', 'Team must have a title');
    });
  }

  // inserts or update based on _id property
  save(object) {
    if (object._id) {
      return this.update(object);
    }
    return this.insert(object);
  }

}

module.exports = new SkillStore(db);
