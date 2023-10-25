
FROM node:14.20 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/invoice-app /usr/share/nginx/html



# Use an official Nginx image as the base image
# FROM nginx

# Copy the built Angular app to the appropriate location in the container
# COPY dist/invoice-app /usr/share/nginx/html

# Expose port 80 for the Nginx server
# EXPOSE 80

# Start the Nginx server when the container starts
# CMD ["nginx", "-g", "daemon off;"]