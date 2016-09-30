import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { spawnSync, child } from 'child_process';

Meteor.methods({
  "runners.verify": () => {
    let result = spawnSync('gitlab-runner', ['verify', '--delete'], {encoding: 'utf8'});
    return result.stderr.replace(/\u001b\[[0-9]+;[0-9]*m/g, '');
  },
  'runners.delete': (runner) => {
    let result = spawnSync('gitlab-runner', ['unregister', '-u', runner.url, '-t', runner.token], {encoding: 'utf8'});
    return result.stderr.replace(/\u001b\[[0-9]+;[0-9]*m/g, '');
  },
  'runners.add': (params) => {
    var commandParams = _.chain(_.pairs(params)).map((p) => {
      if (_.isBoolean(p[1])) {
        if (p[1]) {
          return [`--${p[0]}`]; 
        }
      } else if (_.isString(p[1])) {
        return [`--${p[0]}`, p[1]];
      } else if (_.isArray(p[1])) {
        return _.map(p[1], (v) => [`--${p[0]}`, v]);
      }
      return [];
    }).flatten().value();
    commandParams = ['register', '-n'].concat(commandParams);
    let result = spawnSync('gitlab-runner', commandParams, {encoding: 'utf8'});
    return result.stderr.replace(/\u001b\[[0-9]+;[0-9]*m/g, '');
  }
});
