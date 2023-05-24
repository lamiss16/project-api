# Microservices Application with Singer and Album Database

This is a microservices application built with GraphQL and REST, consisting of multiple services interacting with each other to manage data related to singers and albums.

## Overview

The application is divided into several components:

- **API Gateway**: Acts as the entry point for client requests and handles the routing of requests to the appropriate microservices.
- **Singer Service**: Manages data related to singers, including creating singers, retrieving singer information, and searching for singers. Exposes REST endpoints.
- **Album Service**: Manages data related to albums, including creating albums, retrieving album information, and searching for albums. Exposes REST endpoints.
- **Database**: Stores the data for singers and albums. In this example, a relational database is used.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Docker (for running the database)

## Installation

Follow these steps to set up and run the microservices application:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd microservices-application`
3. Install dependencies for each service:
   - API Gateway: `cd api-gateway && npm install`
   - Singer Service: `cd singer-service && npm install`
   - Album Service: `cd album-service && npm install`
4. Start the database:
   - Run `docker-compose up -d` to start the database container.
5. Set up the database schema and seed data:
   - Connect to the database using your preferred database management tool.
   - Execute the SQL scripts in the `database` folder to create the necessary tables and seed initial data.
6. Configure environment variables:
   - Rename the `.env.example` files in each service folder to `.env`.
   - Update the `.env` files with appropriate configuration values (database connection details, ports, etc.).
7. Start each service:
   - API Gateway: `cd api-gateway && npm start`
   - Singer Service: `cd singer-service && npm start`
   - Album Service: `cd album-service && npm start`

## Usage

Once the microservices are running, you can interact with the application using both GraphQL queries/mutations and REST endpoints. The API Gateway serves as the entry point for client requests.

### GraphQL

- Access the GraphQL Playground or GraphQL client of your choice.
- Set the GraphQL endpoint to `http://localhost:<api-gateway-port>/graphql` (replace `<api-gateway-port>` with the actual port number configured in the `.env` file of the API Gateway).
- Use the GraphQL schema and available queries/mutations to interact with the application. Here are some examples:

  ```graphql
  # Retrieve information about a singer by ID
  query GetSinger {
    singer(id: "1") {
      id
      name
      description
    }
  }

  # Create a new singer
  mutation CreateSinger {
    createSinger(name: "John Doe", description: "A talented singer") {
      id
      name
      description
    }
  }

  # Search for albums
  query SearchAlbums {
    albums {
      id
      title
      description
    }
  }

  # Create a new album
  mutation CreateAlbum {
    createAlbum(title: "My Album", description: "An awesome album") {
      id
      title
      description
    }
  }
