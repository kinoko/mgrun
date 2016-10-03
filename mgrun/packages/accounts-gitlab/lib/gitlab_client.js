
Gitlab = {};

Gitlab.requestCredential = function (options, credentialRequestCompleteCallback) {
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'gitlab'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
    return;
  }


  let credentialToken = Random.id();

  let loginStyle = OAuth._loginStyle('gitlab', config, options);

  let loginUrl = config.host + "/oauth/authorize"
        + '?client_id=' + config.appId
        + '&redirect_uri=' + OAuth._redirectUri('gitlab', config)
        + '&response_type=code'
        + '&state=' + OAuth._stateParam(loginStyle, credentialToken);

  OAuth.launchLogin({
    loginService: "gitlab",
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken
  });
};
