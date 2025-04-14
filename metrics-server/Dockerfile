FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY src/ ./

EXPOSE 9091

CMD ["node", "metrics-server.js"]
