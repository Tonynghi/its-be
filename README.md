# ITS-BE: Intelligent Tutoring System Backend

This project is the backend for an Intelligent Tutoring System (ITS), a project in Software Architecture (HK251) - a HCMUT course, built with the [NestJS](https://nestjs.com/) framework using TypeScript. It is designed as a scalable, modular microservices architecture to support authentication, user management, learning content, and personalization features.

## Project Structure

- **apps/gateway**: API gateway for routing and aggregation
- **apps/iam**: Identity and Access Management (authentication, users)
- **apps/learning-content**: Learning content management
- **apps/learning-personalization**: Personalization and recommendation services
- **common/**: Shared modules, errors, and topics

## Prerequisites

- [Node.js](https://nodejs.org/) (v22 or higher recommended)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) (v1 or v3)
- [Docker Desktop](https://www.docker.com/) (for running dependencies like MongoDB/Kafka)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass) (optional, for checking the database)
- [Postman](https://www.postman.com/downloads/) (optional download, or using from web, for API testing)

## Setup

## Setup environment

Make sure you have these files in your project since they are essential to running the project

- **.env**: Environment variables for project
- **gcp-key.json**: Key file for Google Cloud Storage connection

## Install dependencies:

```bash
yarn
```

## Running the Project

Make sure to have your Docker Desktop running before following for the steps below.

### Pull the Kafka docker image

```bash
docker pull wurstmeister/zookeeper:latest
```

### Start the docker image

```bash
yarn docker:up
```

### Development (all services concurrently)

```bash
yarn start
```

This will start the following modules in watch mode:

- IAM (Identity and Access Management)
- Learning Content (Incomplete at the moment)
- Learning Personalization (Incomplete at the moment)

This will take sometime for the service to start completely as it involves multiple microservices at the same time. Wait until a log about "Nest app has been started..." and you are good to go.

# Author

Group 4
