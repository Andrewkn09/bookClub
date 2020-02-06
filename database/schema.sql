DROP TABLE IF EXISTS authors;

CREATE TABLE authors
(
  id serial PRIMARY KEY,
  first varchar(20) NOT NULL,
  middle varchar(20),
  last varchar(20) NOT NULL
)

DROP TABLE IF EXISTS books;

CREATE TABLE books
(
  id serial PRIMARY KEY,
  title varchar(50) NOT NULL ,
  author varchar(30) NOT NULL references authors(first, middle, last),
  date date default NOT NULL,
)

