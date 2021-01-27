#!/bin/sh

set -e

echo 'Generating WinkelZoeker-api docker image'

docker build -t winkelzoeker/winkelzoeker-api -f Dockerfile.yml .
# docker build -t winkelzoeker/winkelzoeker-api -f Dockerfile-GHA.yml .

echo 'Image built successfully.'
