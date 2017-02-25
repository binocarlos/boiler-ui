FROM node:5.2.0-slim
MAINTAINER kaiyadavenport@gmail.com
WORKDIR /app
ADD ./example/package.json /app/package.json
RUN npm install
ADD example /app
ENTRYPOINT ["npm", "run"]
CMD ["release:serve"]