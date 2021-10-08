FROM node:14-buster

RUN mkdir /var/dependencies/
COPY package.json /var/dependencies/
COPY . /var/www/
WORKDIR /var/dependencies/

RUN npm install
ENV NODE_PATH=/var/dependencies/node_modules
ENV PATH="/var/dependencies/node_modules/.bin:${PATH}"

WORKDIR /var/www
CMD ["npm", "start"]