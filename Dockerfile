FROM node:10

RUN mkdir /bot

COPY app /bot

WORKDIR /bot

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

RUN yarn install --network-timeout 100000
RUN yarn global add pm2 ts-node typescript --network-timeout 100000

RUN pm2 update

EXPOSE 3000

ENTRYPOINT ["pm2-runtime", "ecosystem.config.js"]
