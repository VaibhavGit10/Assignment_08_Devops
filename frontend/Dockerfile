# Use Node base image
FROM node:16

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force && npm install

# Copy remaining source code
COPY . .

# Expose port 3000 (used by React dev server)
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]
