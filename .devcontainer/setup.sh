#!/bin/bash

echo ">>>> >>>> >>>> >>>> ENTERING SETUP.SH <<<< <<<< <<<< <<<< "

## update and install some things we should probably have
apt-get update
apt-get install -y \
  curl \
  apt-utils \
  git \
  gnupg2 \
  jq \
  sudo \
  zsh \
  ca-certificates \
  groff \
  less \
	docker


# Python related tools
echo "Installing PYTHON..."

apt-get install -y software-properties-common
add-apt-repository ppa:deadsnakes/ppa
apt-get update && apt-get install -y python3.7 python3-pip

python3.7 -m pip install pip

apt-get update && apt-get install -y \
  python3-distutils \
  python3-setuptools

python3.7 -m pip install pip --upgrade pip awscli

echo "Installing PYTHON - DONE!"

# set-up and install yarn
# curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
# echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
# apt-get update && apt-get install yarn -y

echo "Installing NODE..."

mkdir $HOME/.nvm
export NVM_DIR=$HOME/.nvm
export NODE_VERSION=12.13.0

cd $NVM_DIR

curl https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

export NODE_PATH=$NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
export PATH=$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

echo "Installing NODE - DONE!"


echo "Installing SecretHub CLI..."

SecretHub cli
echo "deb [trusted=yes] https://apt.secrethub.io stable main" > /etc/apt/sources.list.d/secrethub.sources.list && \
apt-get update
apt-get install -y secrethub-cli

echo "Installing SecretHub CLI - DONE"

echo "Installing oh-my-zsh"

setup and install oh-my-zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
cp -R /root/.oh-my-zsh /home/$USERNAME
cp /root/.zshrc /home/$USERNAME
sed -i -e "s/\/root\/.oh-my-zsh/\/home\/$USERNAME\/.oh-my-zsh/g" /home/$USERNAME/.zshrc
chown -R $USER_UID:$USER_GID /home/$USERNAME/.oh-my-zsh /home/$USERNAME/.zshrc

echo "Installing oh-my-zsh - DONE"

echo ">>>> >>>> >>>> >>>> EXITING SETUP.SH <<<< <<<< <<<< <<<< "
