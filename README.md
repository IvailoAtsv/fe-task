# Project Setup Guide

Thank you for cloning our project repository! Follow these steps to set up the project on your local machine.

## Prerequisites

Before getting started, ensure that you have the following installed:

- Node.js and npm (Node Package Manager)
- MongoDB (the project uses a MongoDB database)
- Git (for cloning the repository)

## Installation Steps

1. **Clone the Repository**

   ```bash
   git clone <repository_url>

2. **Install Dependecies**

   cd client
   npm install

   cd ..

   cd server
   npm install

3. **Setup .env files**
   in server folder:
   PORT = 5001
   ORIGIN = http://localhost:3000
   MONGODB_URI = mongodb://127.0.0.1/users
4. **Start the project up!**
    type `npm start` in the terminal of both folders(server & client)
   