FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 5000

# Use npm start instead of running node directly
CMD ["npm", "start"]
