#!/usr/bin/env bash

set -e

IMAGE='docker.pkg.github.com/winkelzoeker/winkelzoeker-api/winkelzoeker.api:head'

docker run -it --entrypoint /bin/sh $IMAGE
