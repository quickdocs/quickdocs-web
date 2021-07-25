FROM node:14-alpine

WORKDIR /app

COPY . /app
RUN npm install && npm run build

EXPOSE 80
ENTRYPOINT ["npm", "run"]
CMD ["start"]
