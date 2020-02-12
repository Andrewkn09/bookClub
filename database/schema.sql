DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users
(
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL,
  email varchar(50) UNIQUE NOT NULL,
  hashpass varchar(60) NOT NULL 
);

DROP TABLE IF EXISTS authors CASCADE;

CREATE TABLE authors
(
  id serial PRIMARY KEY,
  name varchar(50) UNIQUE NOT NULL
);

-- CREATE UNIQUE INDEX auth_3col_uni_idx ON authors (first, middle, last)
-- WHERE middle IS NOT NULL;

-- CREATE UNIQUE INDEX auth_2col_uni_idx ON authors (first, last)
-- WHERE middle IS NULL;

DROP TABLE IF EXISTS genres CASCADE;

CREATE TABLE genres
(
  id serial PRIMARY KEY,
  genre varchar(50) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS books;

CREATE TABLE books
(
  id serial PRIMARY KEY,
  userID int NOT NULL references users(id),
  title varchar(50) NOT NULL ,
  author int NOT NULL references authors(id),
  genre int NOT NULL references genres(id),
  notes varchar(500),
  date_added date DEFAULT CURRENT_DATE
);

