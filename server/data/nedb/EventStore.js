/**
 * Store de projetos.
 */
const Datastore = require('nedb');
const _ = require('lodash');
const assert = require('assert');
const NeDB = require('./NeDBStore');
const path = require('path');

const DATAFILE_PATH = './db/events.dat';
const db = new Datastore({ filename: path.resolve(__dirname, DATAFILE_PATH), autoload: true });

class EventStore extends NeDB {
  // overriding validation
  validate(arg) {
    const members = _.castArray(arg);
    members.forEach((el) => {
      assert.notEqual(el.milestoneId, '', 'Event must have a milestone id');
    });
  }

  fondByMilestoneId(id) {
    return this.find({ milestoneId: id });
  }

}

module.exports = new EventStore(db);
