FROM node:14-alpine

WORKDIR /app

COPY website /app
RUN npm install && npm run build

EXPOSE 3000
ENTRYPOINT ["npm", "run"]
CMD ["start"]
