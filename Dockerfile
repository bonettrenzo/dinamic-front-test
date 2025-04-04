# Etapa 1: Build
FROM node:22 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servir con nginx
FROM nginx:alpine

# Copia el build al directorio de nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Elimina la configuración por defecto y copia la nuestra
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
