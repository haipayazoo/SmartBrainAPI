FROM node:12.14.0-stretch

WORKDIR /usr/src/smartbrainapi

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]