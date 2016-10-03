import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ServiceConfiguration } from "meteor/service-configuration";

Accounts.validateNewUser((user) => {
  if (user.services && user.services.gitlab && user.services.gitlab.isAdmin) {
    return true;
  } else {
    throw new Meteor.Error(403, "Only admin user can login");
  }
});
Accounts.onCreateUser((options, user) => {
  if (options && options.profile) {
    user.profile = options.profile;
  }
  if (user.services && user.services.gitlab) {
    user.username = user.services.gitlab.name;
  }
  return user;
});

ServiceConfiguration.configurations.upsert(
  { service: "gitlab" },
  {
    $set: {
      loginStyle: "popup",
      host: Meteor.settings.public.gitlabHost,
      appId: Meteor.settings.gitlabAppId,
      appSecret: Meteor.settings.gitlabAppSecret
    }
  }
);
