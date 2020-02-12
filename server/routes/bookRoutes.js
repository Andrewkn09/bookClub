const router = require('express').Router();
const db = require('../../database/database.js');
const { isAuthenticated } = require('../middleware.js');

router.get('/', isAuthenticated, async (req, res) => {
  const { id } = req.user;
  try {
    const bookList = await db.many(`SELECT * FROM books WHERE userId = $1`, [
      id,
    ]);

    res.send({ favorites: bookList });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  const { title, author, genre, userid, notes } = req.body;
  try {
    //obtain author key, add if doesn't exist
    const {
      id: authorKey,
    } = await db
      .one(`INSERT INTO authors (name) VALUES ($1) RETURNING id`, [author])
      .catch(err => {
        return db.one(`SELECT id FROM authors WHERE name=$1 `, [author]);
      });

    //obtain genre key, add if doesn't exist
    const {
      id: genreKey,
    } = await db
      .one(`INSERT INTO genres (genre) VALUES ($1) RETURNING id`, [genre])
      .catch(err => {
        return db.one(`SELECT id from genres WHERE genre=$1`, [genre]);
      });

    //add book into database
    await db.none(
      `INSERT INTO books (title, author, genre, userid, notes) VALUES ($1, $2, $3, $4, $5)`,
      [title, authorKey, genreKey, userid, notes]
    );

    res.send('success');
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
