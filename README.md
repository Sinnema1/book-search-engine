# Book Search Engine

## Description

The Book Search Engine is a full-stack web application that allows users to search for books using the Google Books API, save their favorite books to a personal list, and view or manage their saved books. This project demonstrates the implementation of a MERN (MongoDB, Express.js, React, Node.js) stack with GraphQL for API interactions.

## Technologies Used

### Frontend
- React
- React Router
- Apollo Client
- Bootstrap

### Backend
- Node.js
- Express.js
- Apollo Server
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication

### Deployment
- Render (frontend and backend)
- MongoDB Atlas (database)

## Table of Contents

- [Description](#description)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Testing with Apollo](#testing-with-apollo)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation
1. Clone the repository:

   ```bash
   git clone https://github.com/Sinnema1/book-search-engine.git
   ```

2. Navigate to the project directory:

    ```bash
    cd book-search-engine
    ```

3. Install dependencies for both the server and client:

    ```bash
    npm install
    ```

4. Set up environment variables:
	- Create a .env file in the server directory.
 	- Add the following variables:

    ```env
    MONGODB_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    ```

5. Update `App.tsx` by uncommenting the local server URL and comment out the deployed URL

6. Build the client and server:

    ```bash
    npm run build
    ```

7. Seed the database (optional):

    ```bash
    npm run seed
    ```

## Usage
1. Start the application:

    ```bash
    npm develop
    ```

2. Open your browser and navigate to the deployed site or http://localhost:3000.

## Features
• Search for Books: Search for books using keywords. Results include the book’s title, author, description, and a link to the Google Books site.
• Save Books: Logged-in users can save books to their personal account.
• View Saved Books: Manage your saved books by viewing and removing them as needed.
• Authentication: Secure user login and signup functionality.

## Testing with Apollo

You can test the GraphQL API using Apollo Studio or any other GraphQL client:

1. **Start the server**:

   ```bash
   npm run start
   ```
2. **Open the GraphQL Playground or Apollo Studio and connect to the server**:
   ```
   http://localhost:3001/graphql
   ```

3. **Test the available queries and mutations**:

	**Sample Query: Search Books**
	```graphql
	query SearchGoogleBooks($query: String!) {
	  searchGoogleBooks(query: $query) {
	    bookId
	    title
	    authors
	    description
	    image
	    link
	  }
	}
	```

  	**Variables**:
   	```json
	{
	  "query": "Harry Potter"
	}
	```
    
	**Sample Mutation: Save Book**:
	```graphql
 	mutation SaveBook($input: BookInput!) {
	  saveBook(input: $input) {
	    _id
	    username
	    savedBooks {
	      bookId
	      title
	      authors
	      description
	      image
	      link
	    }
	  }
	}
	```

	**Variables**:
   	```json
    {
	  "input": {
	    "bookId": "wrOQLV6xB-wC",
	    "title": "Harry Potter and the Sorcerer's Stone",
	    "authors": ["J.K. Rowling"],
	    "description": "An incredible adventure is about to begin...",
	    "image": "http://example.com/image.jpg",
	    "link": "http://example.com/book-link"
	  }
	}
	```

4. Verify the responses and ensure proper functionality.

## License

This project is licensed under the MIT License.  

## Contributing

1. Fork the repository.  
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
4. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
6. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
8. Open a pull request.

## Questions

- **GitHub**: [Sinnema](https://github.com/Sinnema1/book-search-engine)
- **Deployed App**: [Link](https://book-search-engine-svsx.onrender.com)
- **Email**: test@test.com
