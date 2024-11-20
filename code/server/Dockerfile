# base image
FROM node:14

# working directory
WORKDIR /app

# copy initial package configurations
COPY . .

RUN npm install

# expose the port to outside
EXPOSE 3001

# Let's start!
CMD ["npm", "start"]
