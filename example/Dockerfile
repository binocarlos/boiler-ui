FROM binocarlos/yarn-base
MAINTAINER kaiyadavenport@gmail.com
WORKDIR /app
ADD ./package.json /app/package.json
RUN yarn install
ADD . /app
ENTRYPOINT ["yarn", "run"]
CMD ["release:serve"]