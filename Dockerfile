FROM mhart/alpine-node

RUN apk add --no-cache --update \
        bash \
        ca-certificates \
        git \
        openssl \
        curl

RUN wget -O /usr/bin/gitlab-ci-multi-runner https://gitlab-ci-multi-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-ci-multi-runner-linux-amd64 && \
	chmod +x /usr/bin/gitlab-ci-multi-runner && \
	ln -s /usr/bin/gitlab-ci-multi-runner /usr/bin/gitlab-runner && \
	wget -q https://github.com/docker/machine/releases/download/v0.7.0/docker-machine-Linux-x86_64 -O /usr/bin/docker-machine && \
	chmod +x /usr/bin/docker-machine && \
	mkdir -p /etc/gitlab-runner/certs && \
	chmod -R 700 /etc/gitlab-runner

ADD https://github.com/Yelp/dumb-init/releases/download/v1.0.2/dumb-init_1.0.2_amd64 /usr/bin/dumb-init
RUN chmod +x /usr/bin/dumb-init

ADD app /app
WORKDIR /app

RUN \
  chmod +x ./install && \
  chmod +x ./entrypoint && \
  tar zxf mgrun.tar.gz && mv bundle/* bundle/.[!.]* . && rmdir bundle && rm mgrun.tar.gz

RUN ./install

EXPOSE 80
VOLUME ["/etc/gitlab-runner"]
ENTRYPOINT ["/usr/bin/dumb-init", "./entrypoint"]
CMD ["run"]
