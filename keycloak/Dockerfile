FROM jboss/keycloak:1.9.3.Final

COPY ./NoveaBank-realm.json /opt/jboss/keycloak/NoveaBank-realm.json

CMD ["-b", "0.0.0.0" , "-Dkeycloak.migration.action=import -Dkeycloak.migration.provider=singleFile -Dkeycloak.migration.file=/opt/jboss/keycloak/NoveaBank-realm.json -Dkeycloak.migration.strategy=OVERWRITE_EXISTING"]