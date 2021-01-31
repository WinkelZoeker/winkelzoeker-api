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

## Install


First decrypt '.DEV.env' secrets into '.DEV.env.gpg.decrypted' and move it to '.DEV.env' using the <KEY> provided.

```sh
$ ./bin/handle-secret.sh -f ./secrets/.DEV.env.gpg -d --key <KEY>
$ mv ./secrets/.DEV.env.gpg.decrypted ./secrets/.DEV.env
$ source ./secrets/.DEV.env
```

```sh
npm install
```



## Run tests

Environment variables:
	DEFAULT_ENVIRONMENT=[DEV]

```sh
npm run test
```

## VSCode remarks

* If docker 'dies' between sessions, run 'sudo dockerd'

## Docker Hub

* https://hub.docker.com/repository/docker/winkelzoeker/winkelzoeker.api

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
