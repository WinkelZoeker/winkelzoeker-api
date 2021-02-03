
<h1 align="center">Welcome to winkelzoeker-api :satellite:</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/WinkelZoeker/winkelzoeker-api#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/WinkelZoeker/winkelzoeker-api/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/WinkelZoeker/winkelzoeker-api/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/WinkelZoeker/winkelzoeker-api" />
  </a>
  <a href="https://hub.docker.com/repository/docker/winkelzoeker/winkelzoeker.api" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/docker/image-size/winkelzoeker/winkelzoeker.api?label=DockerHub" />
  </a>
</p>

> WinkelZoeker backend API

### Build Status

![Build](https://github.com/WinkelZoeker/winkelzoeker-api/workflows/Build%20image/badge.svg)


### 🏠 [Homepage](https://github.com/WinkelZoeker/winkelzoeker-api#readme)


This API provides one [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) endpoint to get the nearest stores based on geographic coordinates given in decimal degrees.

To calculate the distance between two coordinates, it is necessary to rely on spherical trigonometry, using the [haversine distance formula](https://en.wikipedia.org/wiki/Haversine_formula). As an architectural choice aiming performance, the system relies on MongoDB for the queries using its geospatial capabilities.

This project is implemented based on [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) and [Hexagonal architecture](https://alistair.cockburn.us/hexagonal-architecture/), with the following structure:

* **core**: core business structures. In this case, the Store and the GeoLocation objects.
* **usecases**: The use cases implemented by this API, as well the infrasctructure interfaces(**ports**) that should be implemented via adapters. 
* **adapters**: The outermost layer in the Hexagonal approach, the *dirtiest* part of the system. All technology related considerations and choices are addressed here, like the database implementation (NoSQL, Relational, vendor X or Y), the way the system will be accessed (web interface, CLI), or how this access will be implemented(REST endpoints, GraphQL, etc) .

## Technologies

- [NodeJs](https://nodejs.org/)
- [Restify](http://restify.com/)
- [MongoDB](https://www.mongodb.com/)
- [Winston](https://github.com/winstonjs/winston)
- [Jest](https://www.docker.com)
- [Cucumber](https://cucumber.io/)
- [Docker and docker-compose](https://www.docker.com/?)

## Prerequisites

- Node 14
- Port 3000 available (for Node serve API content)
- External conection enabled to use external database via MongoDB Atlas.
- [gpg](https://gnupg.org/) 

## Install and Running

First, clone locally this repository, then follow the instructions for running it from source or via docker-compose, along with the front end.

```sh
$ git clone https://github.com/WinkelZoeker/winkelzoeker-api.git
$ cd ./winkelzoeker-api
```

### Secrets handling and dependencies installation

The application relies on configurations set as environment variables. In order to inject those configurations, we provide an encrypted file containing all the configurations needed (otherwhise we would have to use a service like Hashicorp Vault or AWS Parameter Store/Secrets Manager).  

First decrypt `.DEV.env` secrets into `.DEV.env.gpg.decrypted` and move it to `.DEV.env` using the `KEY` provided. This step should be done only once using the script `./bin/handle-secret.sh` provided.

```sh
$ ./bin/handle-secret.sh -f ./secrets/.DEV.env.gpg -d --key <KEY>
$ mv ./secrets/.DEV.env.gpg.decrypted ./secrets/.DEV.env
$ source ./secrets/.DEV.env
```
For a quick check,  run the following command.

```sh
$ echo $MONGO_DATABASE
```
If it returned `winkelzoeker-database` as result, we are able to install the dependencies via the following command, and then run the tests.

```sh
npm install
```

### Unit tests

For the unit tests:

```sh
npm run test:unit
```
### Integration/E2E testing

For the integration/e2e tests, several `Gherkin` tests are provided using the BDD approach.The list of features can be found the the [main.feature](./test/e2e/features/stores/main.feature) file. In order to run those tests, one must first start the service in one shell window using npm:

```sh
source ./secrets/.DEV.env && npm run start
```

then run the tests on another shell (with .DEV.env loaded via `source ./secrets/.DEV.env`)

```sh
source ./secrets/.DEV.env && npm run test:e2e
```

### Smoke test

Once the application is deployed, it is possible to run a small script for smoke testing [provided](./test/e2e_restify.sh), to check if the service is online.

```sh
./test/e2e_restify.sh
```

## API Usage
It is provided an [OpenApi v3](api.yml) documentation, which can be [tested online](https://validator.swagger.io/?url=https://raw.githubusercontent.com/WinkelZoeker/winkelzoeker-api/main/api.yml).

>http://127.0.0.1:3000/v1/stores?latitude={double}&longitude={double}

This endpoint provides, by default, the 5 closest stores on the database, ordered by distance, to the provided `latitude` and `longitude` coordinates, with the response looking  like the excerpt bellow:

```json
{  
	"statusCode":  200,  
	"data":
		[
		  {
		    "city": "Aalsmeer",
		    "postalCode": "1431 HN",
		    "street": "Ophelialaan",
		    "street2": 124,
		    "street3": "Building",
		    "addressName": "Jumbo Aalsmeer Ophelialaan",
		    "uuid": "gssKYx4XJwoAAAFbn.BMqPTb",
		    "longitude": 4.762433,
		    "latitude": 52.264417,
		    "complexNumber": 33010,
		    "showWarningMessage": false,
		    "todayOpen": "08:00",
		    "locationType": "SupermarktPuP",
		    "collectionPoint": true,
		    "sapStoreID": 3178,
		    "todayClose": 1320
		  }
		]
}
```

### Versioning

This API is versioned via url for practical purposes only. One possible refactor would be using **Media Type Versioning**, including the desired version on `Accept` header.

### Coverage Report

Code coverage report is located at `reports/index.html` and can be generated via the command

```sh
npm run test:coverage
```

## CICD pipeline

The solution provides a pipeline (`.github/workflows/build_image-MS.yml`) which publishes a dockerized image to DockerHub [WinkelZoeker repository](https://hub.docker.com/repository/docker/winkelzoeker/winkelzoeker.api).
Before publishing to DockerHub, the actions performs basic tasks such as unit tests and code coverage. 

## Front End

A (really) small front end is provided as a separated application for testing the API. Please refer to [WinkelZoeker Front](https://github.com/WinkelZoeker/winkelzoeker-front) for instructions on how to run the application.

## Running using docker-compose stack

It is also possible to run the full stack using a docker-compose file provided. It spins the api and the front end locally (although the database is still via MongoDB Atlas), enabling the user to access the front end without dependencies other that DockerHub and the database.

First decrypt `.DEV.docker.env` secrets into `.DEV.docker.env.gpg.decrypted` and move it to `.DEV.docker.env` using the `KEY` provided, as done before. 

```sh
$ ./bin/handle-secret.sh -f ./secrets/.DEV.docker.env.gpg -d --key <KEY>
$ mv ./secrets/.DEV.docker.env.gpg.decrypted ./secrets/.DEV.docker.env
```

Then, just run 

```sh
npm run stack:full:up
```
 and point your browser to 
 
 > http://localhost:8080/


## Improvements
* Implement the missing methods on [AbstractMongoRepository](./src/adapters/repository/abstractMongoRepository.ts) for a full CRUD experience.
* Generate a transaction id on the handler, enabling the logs to be grouped among other microservices' calls (if introduced later).
* Specialize the log mechanism for Request logs (handler) and Audit logs (use cases).
* Enable the log mechanism to use tools like Elastic Search.
* Introduce a dependency injection mechanism like [Inversify](https://inversify.io/).
* Introduce a schemma validator for validating requests based on the api specification on the handler, avoiding the developer to create validation code for each endpoint. That can be achieved using libraries like [api-schema-builder](https://github.com/PayU/api-schema-builder).
* Add a MongoDB instance on the docker-compose file, avoiding external dependencies.
* Paging for when the user chooses a limit bigger than a certain value.

## Github Codespaces remarks

* If docker 'dies' between sessions, run 'sudo dockerd'


## Author

👤 **Rodrigo de Souza <rsouza01@gmail.com>**

* Github: [@WinkelZoeker](https://github.com/WinkelZoeker)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/WinkelZoeker/winkelzoeker-api/issues). You can also take a look at the [contributing guide](https://github.com/WinkelZoeker/winkelzoeker-api/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Rodrigo de Souza <rsouza01@gmail.com>](https://github.com/WinkelZoeker).<br />
This project is [MIT](https://github.com/WinkelZoeker/winkelzoeker-api/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
