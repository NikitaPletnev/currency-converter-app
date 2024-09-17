# Use an official Node.js image as the base image
FROM node:16 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Use nginx to serve the built app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 3300
EXPOSE 3300

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
