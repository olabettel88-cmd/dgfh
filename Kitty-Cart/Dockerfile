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

# Expose port (Railway will set PORT env variable)
EXPOSE 5000

# Start the production server
CMD ["npm", "start"]
