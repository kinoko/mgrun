Package.describe({
  name: 'accounts-gitlab',
  version: '0.0.1',
  summary: '',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.4.4');

  api.use('ecmascript');

  api.use('accounts-base', ['client', 'server']);
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.imply('accounts-oauth', ['client', 'server']);
  api.use('service-configuration', ['client', 'server']);
  api.imply('service-configuration', ['client', 'server']);

  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use('underscore', 'server');
  api.use('random', 'client');
  api.use('templating', 'client');
  
  api.add_files("lib/accounts_gitlab.js");
  api.add_files('lib/gitlab_client.js', 'client');
  api.add_files('lib/gitlab_server.js', 'server');

  api.export('Gitlab');

  api.addFiles(
    ['lib/gitlab_configure.html', 'lib/gitlab_configure.js'],
    'client');
});

