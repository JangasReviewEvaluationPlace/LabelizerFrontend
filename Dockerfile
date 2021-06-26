FROM node:13.12.0-alpine

COPY ./ /

RUN npm install
ENV PATH /node_modules/.bin:$PATH
