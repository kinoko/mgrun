Template.configureLoginServiceDialogForGitlab.helpers({
  siteUrl: function () {
    return Meteor.absoluteUrl();
  }
});

Template.configureLoginServiceDialogForGitlab.fields = function () {
  return [
    {property: 'host', label: 'Gitlab host'},
    {property: 'appId', label: 'App Id'},
    {property: 'appSecret', label: 'App Secret'},
  ];
};
