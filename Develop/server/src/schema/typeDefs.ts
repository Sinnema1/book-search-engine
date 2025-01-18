const typeDefs = `
    type User {
      _id: ID
      username: String!
      email: String!
      password: String!
      savedBooks: [Book]
    }
    
    type Book {
      _id: ID
      bookId: String!
      title: String!
      authors: [String]
      description: String!
      image: String
      link: String
    }

    type Query {
      helloWorld: String!
      getSingleUser: User!
    }
`;
export default typeDefs;