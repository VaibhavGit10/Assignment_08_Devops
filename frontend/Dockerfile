FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package.json files
COPY package*.json ./

# Install dependencies with relaxed peer rules
RUN npm cache clean --force && npm install --legacy-peer-deps

# Copy all files
COPY . .

# Expose app port
EXPOSE 3000

# Start app
CMD ["npm", "start"]
