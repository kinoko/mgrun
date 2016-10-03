# mgrun

A docker-based multi runners for gitlab with web-based management.

# Usage

```sh
docker run -d --link mongo:mongo -e MONGO=URL="mongodb://..." \
  -e GITLAB_HOST="https:///..." \ 
  -e ROOT_URL="http://..." \
  -e GITLAB_APP_ID="..." \
  -e GITLAB_APP_SECRET="..." \
  -p 3000:80 \
  --name mgrun \
  kinoko/mgrun
```

# Options

Name | Description | Default | Example
-----|-------------|---------|---------
MONGO_URL | URL of the mongo db. | mongodb://mongo:27017/mgrun |
ROOT_URL | URL of mgrun. | http://localhost |
PORT | Port number to publish mgrun. | 80 |
GITLAB_HOST | Hostname of the gitlab. | http://localhost |
GITLAB_APP_ID | Oauth application ID from gitlab oauth provider. | |
GITLAB_APP_SECRET | Oauth application secret from gitlab oauth provider. | 
DEFAULT_LINKS | Default links for the docker container of runners. The links should be separated by a space. | | "example:example test:test foo:bar"

# Volume

This image exposes `/etc/gitlab-runner` which contains `config.toml`. `config.toml` contains the configurations for the managed gitlab runners.
