FROM node:14-alpine

# Optimise for production
ENV NODE_ENV production

# Create app directory
WORKDIR /usr/src/app

# Copy app files
COPY --chown=node:node . /usr/src/app

# Install only production dependencies
RUN npm ci --only=production

USER node

# Make port 8080 accessible outside of the container
EXPOSE 8080
CMD "npm" "start"