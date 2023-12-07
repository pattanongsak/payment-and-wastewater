
FROM node:16.14.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Setup environment variables
ENV NODE_ENV development
ENV PORT 5000

# Bundle app source
COPY . /usr/src/app

EXPOSE 5000
CMD ["npm","start"]