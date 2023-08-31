FROM node:20

WORKDIR /home/node/app

USER node

CMD ["tail", "-f", "/dev/null"]