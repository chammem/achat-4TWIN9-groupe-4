FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
RUN npm install -g @angular/cli  # Installation globale de Angular CLI
COPY . .
RUN export NODE_OPTIONS=--openssl-legacy-provider && npm run build

FROM nginx:alpine
# Préparation du serveur de métriques

# Logging vers stdout
RUN ln -sf /dev/stdout /var/log/node.log

# Copie du build Angular
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 9091

# Lancer metrics-server.js + nginx
CMD ["sh", "-c", "(\n\
      cd /metrics-server && \n\
      node metrics-server.js >> /var/log/node.log 2>&1 & \n\
    ); \n\
    nginx -g 'daemon off;'"]
