import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import fs from 'fs';
import toml from 'toml';

if (Meteor.isServer) {
  Meteor.publish('runners', function() {
    const publishedKeys = new Set();
    const callback = (err, data) => {
      if(err) {
        this.error(new Meteor.Error("list-runner", err.message, err.syscall));
        return;
      }
      let parsed = toml.parse(data);
      let runners = parsed.runners ? parsed.runners : [];
      let pubed = new Set(publishedKeys);
      for (let runner of runners) {
        let token = runner.token;
        if (!pubed.has(token)) {
          this.added('runners', token, runner);
          publishedKeys.add(token);
        }
        pubed.delete(token);
      }
      for (let key of pubed) {
        this.removed('runners', key);
        publishedKeys.delete(key);
      }
    };
    let path = Meteor.settings.runnerConfigPath;
    fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
      callback(err, data);
      this.ready();
    });
    const watcher = fs.watch(path, (eventType, filename) => {
      if (eventType == 'change') {
        fs.readFile(path, { encoding: 'utf8' }, callback);
      }
    });

    this.onStop(() => {
      watcher.close();
    });
  });
}
