# Use lightweight Node base image
FROM node:16-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy only package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
# --force: bypass peer dependency conflicts
# --no-audit: skip vulnerability audit (faster)
# --legacy-peer-deps: optional, adds compatibility for older packages
RUN npm install --force --no-audit --legacy-peer-deps --loglevel=error

# Copy all project files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
