# Dockerfile

FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install faker
RUN npm install csv-parser fast-csv
RUN npm install body-parser

COPY . .

# Ejemplo de configuración de variable de entorno en el Dockerfile

ENV FRANKFURTER_API_URL https://api.frankfurter.app

EXPOSE 3000

CMD ["node", "app.js"]
#