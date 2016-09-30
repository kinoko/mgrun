import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import fs from 'fs';

Meteor.methods({
  "global.concurrent": (val) => {
    let path = Meteor.settings.runnerConfigPath;
    fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
      let updated = data.replace(/concurrent[ ]*=[ ]*[0-9]+/, `concurrent = ${val}`);
      fs.writeFile(path, updated, 'utf8', (err) => {
      });
    });
  }
});
