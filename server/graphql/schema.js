const typeDefs = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: String!
    isVerified: Boolean!
    createdAt: String!
  }

  type Author {
    id: ID!
    firstName: String!
    lastName: String!
    bio: String
    isActive: Boolean!
    createdAt: String!
  }

  type Category {
    id: ID!
    name: String!
    description: String
    isActive: Boolean!
    createdAt: String!
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
    category: Category!
    description: String
    isbn: String
    publishedYear: Int
    coverUrl: String
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type BooksResult {
    books: [Book!]!
    total: Int!
    page: Int!
    totalPages: Int!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    books(search: String, category: ID, author: ID, page: Int, limit: Int): BooksResult!
    book(id: ID!): Book
    authors: [Author!]!
    author(id: ID!): Author
    categories: [Category!]!
    category(id: ID!): Category
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    createBook(title: String!, author: ID!, category: ID!, description: String, isbn: String, publishedYear: Int, coverUrl: String): Book!
    updateBook(id: ID!, title: String, author: ID, category: ID, description: String, isbn: String, publishedYear: Int, coverUrl: String): Book!
    deleteBook(id: ID!): Boolean!
    toggleBook(id: ID!): Book!
    createAuthor(firstName: String!, lastName: String!, bio: String): Author!
    updateAuthor(id: ID!, firstName: String, lastName: String, bio: String): Author!
    deleteAuthor(id: ID!): Boolean!
    toggleAuthor(id: ID!): Author!
    createCategory(name: String!, description: String): Category!
    updateCategory(id: ID!, name: String, description: String): Category!
    deleteCategory(id: ID!): Boolean!
    toggleCategory(id: ID!): Category!
  }
`;

module.exports = { typeDefs };
