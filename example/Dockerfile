FROM node:7
MAINTAINER kaiyadavenport@gmail.com
WORKDIR /app
ADD ./package.json /app/package.json
RUN npm install
ADD . /app
RUN npm run release
ENTRYPOINT ["npm", "run"]
CMD ["serve"]