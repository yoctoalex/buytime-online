FROM node:12

COPY . /var/www/
WORKDIR /var/www/

RUN node --version
RUN npm install
RUN npm run build
CMD ["node", "dist/main"]