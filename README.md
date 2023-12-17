
# Airbnb Clone Project

## Description
🏡 This project is an Airbnb clone built using Node.js, Express.js, and MongoDB. It allows users to create, edit, and delete listings, add reviews, and manage authentication and authorization. The application uses various npm packages and dependencies to enhance functionality and features.

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Features](#features)
4. [Contributing](#contributing)

## Installation
1. Clone the repository.
2. Run `npm install` to install all dependencies.
3. Set up your environment variables using a `.env` file. Refer to the provided `.env.example`.

## Usage
1. Run the application using `npm start` or your preferred method.
2. Open your browser and navigate to `http://localhost:3000` (or the specified port).
3. The project uses the following npm packages and dependencies:

   - **@here/maps-api-for-javascript** 🗺️: Provides interactive maps.
   - **axios** 🌐: Makes HTTP requests to external services.
   - **cloudinary** ☁️: Manages image storage and manipulation.
   - **connect-flash** 💬: Displays flash messages.
   - **connect-mongo** 🍃: Stores session data in MongoDB.
   - **dotenv** 🧅: Manages environment variables for configuration.
   - **ejs** and **ejs-mate** 🖥️: Templating engines used.
   - **express** 🚀: Web application framework.
   - **express-session** 🍪: Handles session management.
   - **joi** 🛡️: Provides input validation.
   - **method-override** 🔄: Allows the use of HTTP methods PUT and DELETE.
   - **mongoose** 📦: MongoDB object modeling tool.
   - **mongoose-findorcreate** 🧑‍💻: Simplifies user authentication with Mongoose.
   - **multer** and **multer-storage-cloudinary** 📤: Handle file uploads to Cloudinary.
   - **passport** 🛂: Authentication middleware.
   - **passport-local** and **passport-local-mongoose** 🔐: Provide local authentication strategies.


## Features
- **Listings Management** 🏡: Users can create, edit, and delete their own listings.
- **Review System** 🌟: Users can add and delete reviews for listings.
- **Location Display** 🗺️: Listings display the present location using maps.
- **Authentication and Authorization** 🔐: Users are required to authenticate and have proper authorization.
  
## Contributing
🤝 Feel free to contribute to this project by submitting pull requests.
