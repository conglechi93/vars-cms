FROM node:16-alpine
WORKDIR /vars-cms
COPY package*.json ./
COPY . .
RUN yarn install
RUN npm i -D eslint-plugin-react-hooks --force
EXPOSE 3000
CMD ["npm","start"]
