FROM node:20.8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN useradd -m appuser
USER appuser

CMD ["npm", "run", "debug"]