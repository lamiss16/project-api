#Microservices Application with Singer and Album Database
This is a microservices application built with GraphQL and REST, consisting of multiple services interacting with each other to manage data related to singers and albums.

#Overview
The application is divided into several components:

API Gateway: Acts as the entry point for client requests and handles the routing of requests to the appropriate microservices.
Singer Service: Manages data related to singers, including creating singers, retrieving singer information, and searching for singers. Exposes REST endpoints.
Album Service: Manages data related to albums, including creating albums, retrieving album information, and searching for albums. Exposes REST endpoints.
Database: Stores the data for singers and albums. In this example, a relational database is used.
Prerequisites
Before running the application, make sure you have the following installed:

Node.js (v14 or higher)
npm (Node Package Manager)
Docker (for running the database)
Installation
Follow these steps to set up and run the microservices application:

Clone the repository: git clone <repository-url>
Navigate to the project directory: cd microservices-application
Install dependencies for each service:
API Gateway: cd api-gateway && npm install
Singer Service: cd singer-service && npm install
Album Service: cd album-service && npm install
Start the database:
Run docker-compose up -d to start the database container.
Set up the database schema and seed data:
Connect to the database using your preferred database management tool.
Execute the SQL scripts in the database folder to create the necessary tables and seed initial data.
Configure environment variables:
Rename the .env.example files in each service folder to .env.
Update the .env files with appropriate configuration values (database connection details, ports, etc.).
Start each service:
API Gateway: cd api-gateway && npm start
Singer Service: cd singer-service && npm start
Album Service: cd album-service && npm start
Usage
Once the microservices are running, you can interact with the application using both GraphQL queries/mutations and REST endpoints. The API Gateway serves as the entry point for client requests.
