const router = require('express').Router();
const db = require('../../database/database.js');
const { isAuthenticated } = require('../middleware.js');

router.get('/', isAuthenticated, async (req, res) => {
  const { id } = req.user;
  try {
    const bookList = await db.manyOrNone(
      `SELECT b.id, b.title, a.author, g.genre, b.notes, b.date_added
        FROM books b
          INNER JOIN authors a
          ON b.author = a.id
            INNER JOIN genres g
            ON b.genre = g.id
              WHERE userId = $1`,
      [id]
    );

    res.send({ favorites: bookList });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  const { title, author, genre, notes } = req.body;
  const userid = req.user.id;
  try {
    //obtain author key, add if doesn't exist
    const {
      id: authorId,
    } = await db
      .one(`INSERT INTO authors (author) VALUES ($1) RETURNING id`, [author])
      .catch(err => {
        return db.one(`SELECT id FROM authors WHERE author=$1 `, [author]);
      });

    //obtain genre key, add if doesn't exist
    const {
      id: genreId,
    } = await db
      .one(`INSERT INTO genres (genre) VALUES ($1) RETURNING id`, [genre])
      .catch(err => {
        return db.one(`SELECT id from genres WHERE genre=$1`, [genre]);
      });

    //add book into database
    await db.none(
      `INSERT INTO books (title, author, genre, userid, notes) VALUES ($1, $2, $3, $4, $5)`,
      [title, authorId, genreId, userid, notes]
    );

    res.send('success');
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.put('/', async (req, res) => {
  const { id, title, author, genre, notes } = req.body;

  try {
    const {
      id: authorId,
    } = await db
      .one(`SELECT id FROM authors WHERE author=$1`, [author])
      .catch(err => {
        return db.one(`INSERT INTO authors (author) VALUES ($1) RETURNING id`, [
          author,
        ]);
      });

    const { id: genreId } = await db
      .one(`SELECT id from genres WHERE genre=$1`, [genre])
      .catch(err => {
        return db.one(`INSERT INTO genres (genre) VALUES ($1) RETURNING id`, [
          genre,
        ]);
      });

    const response = await db.none(
      `
      UPDATE books SET
        title = $2,
        author = $3,
        genre = $4,
        notes = $5
      WHERE id = $1 
    `,
      [id, title, authorId, genreId, notes]
    );

    console.log(response);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
