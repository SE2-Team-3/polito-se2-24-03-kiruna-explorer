# base image
FROM node:18

# working directory
WORKDIR /app

# copy initial package configurations
COPY . .

RUN npm install

# expose the port to outside
EXPOSE 5173

# Let's start!
CMD ["npm", "run", "dev"]