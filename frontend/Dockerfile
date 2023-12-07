
# FROM node:16.14.0

# # Create app directory
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# # Install app dependencies
# COPY package.json /usr/src/app/
# RUN npm i

# # Setup environment variables
# # ENV NODE_ENV development
# # ENV PORT 3000

# # Bundle app source
# COPY . /usr/src/app

# EXPOSE 3000
# CMD ["npm","start"]

FROM node:alpine

WORKDIR /app
COPY package.json ./

COPY ./ ./

EXPOSE 3000

CMD ["npm", "run", "start"]