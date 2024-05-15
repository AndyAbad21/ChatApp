FROM node:latest AS node-builder

WORKDIR /frontend-app/frontendchatapp 
# Copiar los archivos de la aplicación Angular
COPY frontendchatapp/ /frontend-app/frontendchatapp/
# intalamos las dependencias
RUN npm install --force
# ejecutamos la apliacion en modo produccion
RUN npm run build --prod

WORKDIR /frontend-app/server
# Copiar el archivo package.json del servidor Node.js
COPY server/package*.json /frontend-app/server/
# Instalamos las dependencias
RUN npm install
# Copiar los archivos del servidor Node.js
COPY server/ /frontend-app/server/

FROM nginx:1.17.1-alpine
# Instalar nodejs y npm en la imagen de Nginx
RUN apk add --update nodejs npm
# Copiar los archivos estáticos de la aplicación Angular compilada al directorio de Nginx
COPY --from=node-builder /frontend-app/frontendchatapp/dist/frontendchatapp/browser /usr/share/nginx/html
# Copiar los archivos del servidor Node.js al directorio de trabajo en la imagen de Nginx
COPY --from=node-builder /frontend-app/server/ /frontend-app/server
# Comando para ejecutar el servido y el nginx
CMD ["sh", "-c", "node /frontend-app/server/index.js & nginx -g 'daemon off;'"]

#Se expone los puertos para el acceso desde fuera de contenedor
EXPOSE 80
EXPOSE 4000
