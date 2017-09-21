FROM node:6

EXPOSE 8081
COPY . /srv/app
WORKDIR /srv/app
RUN npm i
RUN npm run build

CMD ["/usr/local/bin/node", "index.js"]
