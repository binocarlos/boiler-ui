FROM node:6.10.0
MAINTAINER kaiyadavenport@gmail.com
WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install
COPY ./ /app
ENTRYPOINT ["npm", "run"]
CMD ["watch"]