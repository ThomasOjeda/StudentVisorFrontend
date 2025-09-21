# Etapa 1: Construir la aplicación Angular
FROM node:20.11.1 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Construir la aplicación Angular
RUN npm run build --prod

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar los archivos de build de Angular desde la etapa anterior
COPY --from=build /app/dist/student-visor-frontend/browser /usr/share/nginx/html

# Copiar el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto en el que Nginx servirá la aplicación
EXPOSE 80

# Comando por defecto para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]