# Step 1: Build Vue Project
# build stage
FROM node:lts-alpine as build-stage
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .
# install node modules and build assets
RUN yarn install && yarn build

# Step 2: Create Nginx Server
FROM nginx:stable-alpine as production-stage
COPY docker/nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]