FROM jenkins:1.651.2

# Based on http://container-solutions.com/running-docker-in-jenkins-in-docker/

USER root
RUN apt-get update \
      && apt-get install -y sudo \
      && rm -rf /var/lib/apt/lists/*
RUN echo "jenkins ALL=NOPASSWD: ALL" >> /etc/sudoers

USER jenkins