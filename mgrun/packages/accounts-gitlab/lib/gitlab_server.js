Gitlab = {};

Oauth.registerService('gitlab', 2, null, function(query) {
  let token    = getTokenResponse(query);
  let accessToken = token.access_token;
  let userInfo = getUserInfo(accessToken);

  let profile = {
    id: userInfo.id,
    name: userInfo.name,
    username: userInfo.username,
    isAdmin: userInfo.is_admin
  };
  var serviceData = {
    accessToken: token.access_token,
    refreshToken: token.refresh_token
  };
  _.extend(serviceData, profile);

  return {
    serviceData: serviceData,
    options: { profile: profile }
  };
});


let getTokenResponse = function (query) {
  let config = ServiceConfiguration.configurations.findOne({service: 'gitlab'});
  if (!config) {
    throw new ServiceConfiguration.ConfigError("Service not configured");
  }

  var response;
  try {
    response = HTTP.post(config.host + "/oauth/token", {
      headers: {
        Accept: 'application/json'
      },
      params: {
        code: query.code,
        client_id: config.appId,
        client_secret: OAuth.openSecret(config.appSecret),
        grant_type: 'authorization_code',
        redirect_uri: OAuth._redirectUri('gitlab', config),
        state: query.state
      }
    });
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with Gitlab. " + err.message), {response: err.response});
  }

  if (response.statusCode != 200) {
    throw new Error("Failed to complete OAuth handshake with Gitlab. " + response.data.message);
  } else {
    return response.data;
  }
};

let getUserInfo = function(accessToken) {
  let config = ServiceConfiguration.configurations.findOne({service: 'gitlab'});
  if (!config) {
    throw new ServiceConfiguration.ConfigError("Service not configured");
  }

  var response;
  try {
    response = HTTP.get(config.host + "/api/v3/user", {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + accessToken
      }
    });
  } catch (err) {
    throw _.extend(new Error("Failed to retrive user info from Gitlab. " + err.message), {response: err.response});
  }

  if (response.statusCode != 200) {
    throw new Error("Failed to user info from Gitlab. " + response.data.message);    
  } else {
    return response.data;
  }
};


Gitlab.retrieveCredential = function(credentialToken) {
  return Oauth.retrieveCredential(credentialToken);
};
