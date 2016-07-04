FROM jenkinsci/jenkins:2.9

# Based on http://container-solutions.com/running-docker-in-jenkins-in-docker/

USER root
RUN apt-get update \
      && apt-get install -y sudo \
      && rm -rf /var/lib/apt/lists/*
RUN echo "jenkins ALL=NOPASSWD: ALL" >> /etc/sudoers

USER jenkins

COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN /usr/local/bin/plugins.sh /usr/share/jenkins/ref/plugins.txt \
    && echo 2.0 > /usr/share/jenkins/ref/jenkins.install.UpgradeWizard.state
