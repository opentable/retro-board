FROM docker.otenv.com/ot-node-base-4:latest

EXPOSE 3001
COPY . /srv/app
WORKDIR /srv/app
RUN npm install npm@latest -g
RUN npm i
RUN npm run build

CMD ["/usr/local/bin/node", "index.js"]
