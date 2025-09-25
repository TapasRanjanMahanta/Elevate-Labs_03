// Import Express
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory books array
let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho" },
];

// Routes

// GET /books - get all books
app.get("/books", (req, res) => {
  res.json(books);
});

// POST /books - add a new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "Title and author are required" });
  }

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - update a book
app.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;

  const book = books.find((b) => b.id === parseInt(id));
  if (!book) return res.status(404).json({ error: "Book not found" });

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// DELETE /books/:id - delete a book
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((b) => b.id === parseInt(id));

  if (index === -1) return res.status(404).json({ error: "Book not found" });

  const deletedBook = books.splice(index, 1);
  res.json({ message: "Book deleted", book: deletedBook });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});