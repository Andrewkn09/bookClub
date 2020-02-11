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

DROP TABLE IF EXISTS books;

CREATE TABLE books
(
  id serial PRIMARY KEY,
  title varchar(50) NOT NULL ,
  author int NOT NULL references authors(id),
  date date 
);

