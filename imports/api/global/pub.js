import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import fs from 'fs';
import toml from 'toml';

if (Meteor.isServer) {
  Meteor.publish('global', function() {
    let global = {
      count: 1, current: 1
    };
    const parse = (data) => {
      let parsed = toml.parse(data);
      global.count = parsed.runners ? parsed.runners.length : 1;
      global.current = parsed.concurrent;
      if (global.count < 1) global.count = 1;
      if (!global.current) global.current = 1;
    };
    let path = Meteor.settings.runnerConfigPath;
    fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
      if (err) {
        this.error(new Meteor.Error("load-runner-config", err.message, err.syscall));
        return;
      }
      parse(data);
      this.added("global", 0, global);
      this.ready();
    });
    const watcher = fs.watch(path, (eventType, filename) => {
      if (eventType == 'change') {
        fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
          if (err) {
            this.error(new Meteor.Error("load-runner-config", err.message, err.syscall));
            return;
          }
          parse(data);
          this.changed("global", 0, global);
        });
      }
    });
    this.onStop(() => {
      watcher.close();
    });
  });
}
