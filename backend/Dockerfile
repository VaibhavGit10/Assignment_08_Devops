# Use a smaller base image (Alpine-based Node.js image)
FROM node:16-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies only when needed
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose only the port used by your app
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
