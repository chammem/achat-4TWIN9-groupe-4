FROM openjdk:17-jdk-alpine
EXPOSE 8089
COPY target/achat-1.0.jar achat.jar
# Forcer le profil "docker" et vérifier la santé
HEALTHCHECK --interval=30s --timeout=3s \
CMD curl -f http://localhost:8089/SpringMVC/actuator/health || exit 1
ENTRYPOINT ["java","-jar","achat.jar"]