FROM jboss/keycloak:1.9.3.Final

COPY ./NoveaBank-realm.json /opt/jboss/keycloak/NoveaBank-realm.json

CMD ["/opt/jboss/keycloak/bin/standalone.sh", "-b", "0.0.0.0" , "-Dkeycloak.import=/opt/jboss/keycloak/NoveaBank-realm.json"]