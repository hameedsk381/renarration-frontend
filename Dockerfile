# Stage 1: Build the application
FROM node:20-alpine
RUN addgroup app && adduser -S -G app app
USER app
# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
USER root
RUN chown -R app:app .
USER app
# Install dependencies
RUN npm install

# Copy project files
COPY . .


# Expose port 80
EXPOSE 5173

# Start nginx
CMD npm run dev
