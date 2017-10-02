/* eslint no-underscore-dangle: 0 */  // needs this for mongo like _id
/**
 * Store de projetos.
 */
const Datastore = require('nedb');
const _ = require('lodash');
const assert = require('assert');
const NeDB = require('./NeDBStore');
const path = require('path');

const DATAFILE_PATH = './db/projects.dat';
const db = new Datastore({ filename: path.resolve(__dirname, DATAFILE_PATH), autoload: true });

class ProjectStore extends NeDB {
  // overriding validation
  validate(userArg) {
    const projects = _.castArray(userArg);
    projects.forEach((p) => {
      assert.notEqual(p.name, '', 'Project must have a name');
      assert.notEqual(p.code, '', 'Project must have a code');
    });
  }

  // You may create some custom methods here
  findByCode(code) {
    return this.find({ code });
  }

  // inserts or update based on _id property
  save(project) {
    if (project._id) {
      return this.update(project);
    }
    return this.insert(project);
  }

}

module.exports = new ProjectStore(db);
