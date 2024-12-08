# Use a imagem correspondente à sua versão de Node.js
FROM node:20.12.2

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie os arquivos do projeto para o container
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código
COPY . .

# Exponha a porta em que o servidor vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
