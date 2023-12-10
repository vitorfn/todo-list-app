FROM node:alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json .

# Bundle app source
RUN npm install

# Copy app source
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the app
CMD [ "node", "index.js" ]