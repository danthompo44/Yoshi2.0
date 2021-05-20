# Test web app that returns the name of the host/pod/container servicing req
# Windows
FROM mcr.microsoft.com/windows/servercore:ltsc2019

LABEL maintainer="daniel.24.thompson@bt.com"

# Create directory in container image for app code
RUN mkdir -p /usr/src/app

# Copy app code (.) to /usr/src/app in container image
COPY . /usr/src/app

# Set working directory context
WORKDIR /usr/src/app

# Install dependencies from packages.json
RUN npm install

#Install server dependencies
RUN npm install-server

#Install frontend dependencies
RUN npm install-frontend

# Command for container to execute
ENTRYPOINT [ "npm", "start" ]