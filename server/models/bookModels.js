const db = require('../../database/database.js');

module.exports = {
  getBookList: async (userId, query, sort, order, limit, offset) => {
    return await db.manyOrNone(
      `SELECT b.id, b.title, a.author, g.genre, b.notes, b.date_added
        FROM books b
          INNER JOIN authors a
          ON b.author = a.id
            INNER JOIN genres g
            ON b.genre = g.id
        WHERE userId = $1
        ORDER BY $2:alias $3:alias
        LIMIT $4
        OFFSET $5`,
      [userId, sort.toLowerCase(), order, limit, offset, query]
    );
  },
  getBookCount: async (userId, query) => {
    return await db.one(
      `
    SELECT count(*) from books
      WHERE userId = $1
    `,
      [userId]
    );
  },
  addBook: async (title, authorId, genreId, userId, notes) => {
    return await db.none(
      `INSERT INTO books (title, author, genre, userid, notes) 
        VALUES ($1, $2, $3, $4, $5)`,
      [title, authorId, genreId, userId, notes]
    );
  },
  deleteBook: async bookId => {
    return await db.none(`DELETE FROM books WHERE id = $1`, [bookId]);
  },
  updateBook: async (bookId, title, authorId, genreId, notes) => {
    return await db.none(
      `UPDATE books SET
        title = $2,
        author = $3,
        genre = $4,
        notes = $5
      WHERE id = $1 `,
      [bookId, title, authorId, genreId, notes]
    );
  },
  addAuthor: async authorName => {
    return await db.one(
      `INSERT INTO authors (author) VALUES ($1) RETURNING id`,
      [authorName.toUpperCase()]
    );
  },
  getAuthorId: async authorName => {
    return await db.one(`SELECT id FROM authors WHERE author=$1 `, [
      authorName.toUpperCase(),
    ]);
  },
  addGenre: async genreName => {
    return await db.one(`INSERT INTO genres (genre) VALUES ($1) RETURNING id`, [
      genreName.toUpperCase(),
    ]);
  },
  getGenreId: async genreName => {
    return await db.one(`SELECT id from genres WHERE genre=$1`, [
      genreName.toUpperCase(),
    ]);
  },
};
