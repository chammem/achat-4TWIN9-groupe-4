# Étape 1 : Build Angular
FROM node:18 AS build

WORKDIR /app

# Copie des fichiers nécessaires pour l'installation
COPY package.json package-lock.json ./

# Install specific TypeScript version first
RUN npm install typescript@~4.6.0 --legacy-peer-deps

# Installation des dépendances (legacy-peer-deps si nécessaire)
RUN npm install --legacy-peer-deps

# Installation globale de l'Angular CLI
RUN npm install -g @angular/cli

# Copie du reste du projet
COPY . .

# Compilation du projet Angular
RUN export NODE_OPTIONS=--openssl-legacy-provider && ng build

# Étape 2 : NGINX + Metrics server
FROM nginx:alpine

# Logging vers stdout
RUN ln -sf /dev/stdout /var/log/node.log

# Copie du build Angular dans Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copie de la configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie du dossier contenant metrics-server.js

# Ports exposés
EXPOSE 80 9091

# Commande de démarrage
CMD ["sh", "-c", "(\n\
      cd /metrics-server && \n\
      node metrics-server.js >> /var/log/node.log 2>&1 & \n\
    ); \n\
    nginx -g 'daemon off;'"]

