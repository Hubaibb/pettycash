FROM node:18-alpine

WORKDIR /app

# Copy package.json dan install dependencies
COPY package*.json ./
RUN npm install

# Copy seluruh source code
COPY . .

# Expose port aplikasi
EXPOSE 4000

# Jalankan aplikasi
CMD ["npm", "start"]