# Book Search Engine

## Description

The Book Search Engine is a full-stack web application that allows users to search for books using the Google Books API, save their favorite books to a personal list, and view or manage their saved books. This project demonstrates the implementation of a MERN (MongoDB, Express.js, React, Node.js) stack with GraphQL for API interactions.

## Table of Contents
- [Book Search Engine](#book-search-engine)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Sinnema1/book-search-engine.git
   ```
	2.	Navigate to the project directory:
    ```bash
    cd book-search-engine
    ```
	3.	Install dependencies for both the server and client:
    ```bash
    npm install
    ```
	4.	Set up environment variables:
	•	Create a .env file in the server directory.
	•	Add the following variables:
    ```env
    MONGODB_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    FRONTEND_URL=https://your-frontend-url.com
    ```
	5.	Build the client and server:
    ```bash
    npm run build
    ```
	6.	Seed the database (optional):
    ```bash
    npm run seed
    ```

## Usage
	1.	Start the application:
    ```bash
    npm develop
    ```
	2.	Open your browser and navigate to the deployed site or http://localhost:3000.

Deployed Application

Visit the live application here.

Features
	•	Search for Books: Search for books using keywords. Results include the book’s title, author, description, and a link to the Google Books site.
	•	Save Books: Logged-in users can save books to their personal account.
	•	View Saved Books: Manage your saved books by viewing and removing them as needed.
	•	Authentication: Secure user login and signup functionality.

Technologies Used
	•	Frontend:
	•	React
	•	React Router
	•	Apollo Client
	•	Bootstrap
	•	Backend:
	•	Node.js
	•	Express.js
	•	Apollo Server
	•	MongoDB with Mongoose
	•	JSON Web Tokens (JWT) for authentication
	•	Deployment:
	•	Render (frontend and backend)
	•	MongoDB Atlas (database)

License

This project is licensed under the MIT License. See the LICENSE file for details.

Contributing

Contributions are welcome! If you’d like to contribute, please fork the repository and submit a pull request.
	1.	Fork the project
	2.	Create a feature branch:
    ```bash
    git checkout -b feature/your-feature
    ```
	3.	Commit your changes:
    ```bash
    git commit -m “Add your feature”
    ```
	4.	Push to your branch:
    ```bash
    git push origin feature/your-feature
    ```
	5.	Open a pull request

Questions

For any questions, feel free to reach out:
	•	GitHub: Sinnema1
	•	Email: test@test.com