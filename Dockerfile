# Use the official Node.js image as the base image
FROM node:20-alpine

# Set environment variables
ENV NODE_ENV production

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g @nestjs/cli

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 8000

# Define the command to run the app
CMD ["npm", "run", "start:prod"]
