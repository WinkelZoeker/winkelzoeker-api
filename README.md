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


This API provides one endpoint to get the nearest stores based on geographic coordinates given in decimal degrees.

To calculate the distance between two coordinates, it is necessary to rely on spherical trigonometry, using the [haversine distance formula](https://en.wikipedia.org/wiki/Haversine_formula).

This project is implemented based on [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) and [Hexagonal architecture](https://alistair.cockburn.us/hexagonal-architecture/), whith the following structure:

* core: core business structures, in this case, the Store and the GeoLocation.
* usecases: The use cases implemented by this api, as well the infrasctructure interfaces that should be implemented via adapters. 
* adapters: The outer layer, the 'dirtiest' part of the system. All technology related considerations are addressed here.


## Technologies

- [NodeJs](https://nodejs.org/)
- [Jest](https://www.docker.com)
- [MongoDB](https://www.mongodb.com/)
- [Restify](http://restify.com/)
- [Winston](https://github.com/winstonjs/winston)
- [Cucumber](https://cucumber.io/)
- [Docker](https://www.docker.com/?)

## Prerequisites

- Node 14
- Port 3000 available (for Node serve API content)
- External conection enabled to use external database via MongoDB Atlas.

## Install and Running

### Secrets handling and dependencies installation

The application relies on configurations set as environment variables. In order to inject those configurations, we provide an encrypted file containing all the configurations needed (otherwhise we would have to use a service like Hashicorpo Vault, or AWS Parameter Store/Secrets Manager).  

First decrypt `.DEV.env` secrets into `.DEV.env.gpg.decrypted` and move it to `.DEV.env` using the `KEY` provided. This step should be done only once using the script `./bin/handle-secret.sh` provided.

```sh
$ ./bin/handle-secret.sh -f ./secrets/.DEV.env.gpg -d --key <KEY>
$ mv ./secrets/.DEV.env.gpg.decrypted ./secrets/.DEV.env
$ source ./secrets/.DEV.env
```

Then 

```sh
npm install
```

### Unit tests

For the unit tests:

```sh
npm run test:unit
```
### Integration/E2E testing

The integration/e2e tests, several `Gherkin` tests are provided using the BDD approach. In order to run those tests, first start the service in one shell window using npm:

```sh
npm run start
```

then run the tests on another shell (with .DEV.env loaded via `source ./secrets/.DEV.env`)

```sh
source ./secrets/.DEV.env && npm run test:e2e
```

### Smoke test

For smoke testing, run the small script `./test/e2e_restify.sh` to check if the service is online after you start the service via `npm run start` (with the environment variables loaded)

```sh
source ./secrets/.DEV.env && ./test/e2e_restify.sh
```

## API Usage
[OpenApi v3](api.yml) documentation is available.
You can [try it](https://validator.swagger.io/?url=https://raw.githubusercontent.com/WinkelZoeker/winkelzoeker-api/main/api.yml) online

>http://127.0.0.1:3000/v1/stores?latitude={double}&longitude={double}

This endpoint provides, by default,  the 5 closest stores on the database, ordered by distance, to the provided `latitude` and `longitude` coordinates, with the response looking  like the excerpt bellow:

```json
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
```

### Versioning

This API is versioned via url for practical purposes only. One possible refactor would be using **Media Type Versioning**, including the desired version on `Accept` header.

### Coverage Report

Code coverage report is located at `reports/index.html` and can be generated via the command

```sh
npm run test:coverage
```

## CICD pipeline

The solution provides a pipeline (`.github/workflows/build_image-MS.yml`) which publishes a dockerized image to DockerHub[winkelzoeker repository](https://hub.docker.com/repository/docker/winkelzoeker/winkelzoeker.api).
Before publishing to DockerHub, the actions performs basic tasks such as unit tests and code coverage. 


## VSCode remarks

* If docker 'dies' between sessions, run 'sudo dockerd'


## Improvements
* 1
* 2
* ...

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
