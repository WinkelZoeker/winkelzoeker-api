#!/usr/bin/env bash

set -e

IMAGE='docker.pkg.github.com/winkelzoeker/winkelzoeker-api/winkelzoeker.api:head'


# REGULAR START
docker run -it -p 3000:3000 --env-file ./secrets/.DEV.docker.env $IMAGE

# WITH SHELL
# docker run -it --env-file ./secrets/.DEV.docker.env --entrypoint /bin/sh $IMAGE
