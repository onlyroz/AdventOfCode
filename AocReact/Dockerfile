#If we start getting build failures here, change to node:18-alpine3.18
FROM node:18-alpine AS base

# This controls some config values within node
#ARG NODE_ENV=development
#ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY ./package.json ./package-lock.json ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN npm install --platform=linuxmusl --arch=x64
WORKDIR /opt/app
COPY ./ .

FROM base AS build
RUN npm run build

FROM base AS unittest
CMD ["npm", "run", "test"]

FROM base AS dev
COPY ./.env.dev ./.env
EXPOSE 5173
CMD ["npm", "run", "dev"]

#For now, run npm run dev, rather than putting nginx in front of it
FROM base AS final
COPY ./.env.final ./.env
EXPOSE 5173
CMD ["npm", "run", "dev"]

