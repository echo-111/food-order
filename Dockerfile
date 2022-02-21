FROM node:16-alpine as build

WORKDIR /apis

ARG DB_URL
ARG PROD_DB_URL
ARG JWT_SECRET
ARG AWS_REGION
ARG AWS_ACCESS_KEY
ARG AWS_SECRET_KEY
ARG AWS_S3_BUCKET
ENV PATH /apis/node_modules/.bin:$PATH
ENV DB_URL=${DB_URL}
ENV PROD_DB_URL=${PROD_DB_URL}
ENV JWT_SECRET=${JWT_SECRET}
ENV AWS_REGION=${AWS_REGION}
ENV AWS_ACCESS_KEY=${AWS_ACCESS_KEY}
ENV AWS_SECRET_KEY=${AWS_SECRET_KEY}
ENV AWS_S3_BUCKET=${AWS_S3_BUCKET}

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install --quiet

COPY . ./

EXPOSE 8081

CMD npm start
