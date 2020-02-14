const model = require('../models/bookModels.js');

module.exports = {
  getBooks: async (req, res) => {
    const { id } = req.user;
    try {
      const bookList = await model.getBookList(id);

      res.send({ favorites: bookList });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },

  postBook: async (req, res) => {
    const { title, author, genre, notes } = req.body;
    const userId = req.user.id;

    try {
      //obtain author id, add if doesn't exist
      const { id: authorId } = await model
        .getAuthorId(author)
        .catch(() => model.addAuthor(author));

      //obtain genre id, add if doesn't exist
      const { id: genreId } = await model
        .addGenre(genre)
        .catch(err => model.getGenreId(genre));

      //add book into database
      await model.addBook(title, authorId, genreId, userId, notes);

      res.send('success');
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },

  updateBook: async (req, res) => {
    const { id, title, author, genre, notes } = req.body;

    try {
      const { id: authorId } = await model
        .getAuthorId(author)
        .catch(() => model.addAuthor(author));

      const { id: genreId } = await model
        .addGenre(genre)
        .catch(err => model.getGenreId(genre));

      await model.updateBook(id, title, authorId, genreId, notes);

      res.sendStatus(201);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },

  deleteBook: async (req, res) => {
    try {
      await model.deleteBook(req.params.bookId);

      res.sendStatus(201);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
};
