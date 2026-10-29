# Journey · private travel planner
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY TravelPlannerServer.java .
RUN javac -encoding UTF-8 -d out TravelPlannerServer.java

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/out ./out
COPY web ./web
RUN mkdir -p /app/data

ENV PORT=8080
ENV JOURNEY_ONLINE=1
EXPOSE 8080

# JOURNEY_PASSWORD must be provided by the hosting platform.
# Data is written to /app/data; mount a persistent volume to keep plan.json.
CMD ["sh", "-c", "java \"-Dfile.encoding=UTF-8\" --add-modules jdk.httpserver -cp out TravelPlannerServer --online --port ${PORT}"]
