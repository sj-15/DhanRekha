FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY . .

# Grant execute permission
RUN chmod +x mvnw

RUN ./mvnw dependency:go-offline -B
RUN ./mvnw package -DskipTests

CMD ["java", "-jar", "target/dhanrekha-0.0.1-SNAPSHOT.jar"]
