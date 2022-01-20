DROP DATABASE IF EXISTS SDC;
CREATE DATABASE SDC;

DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions(
  id INT PRIMARY KEY,
  product_id INT NOT NULL,
  body TEXT NOT NULL,
  date_written DATE NOT NULL,
  asker_name TEXT NOT NULL,
  asker_email TEXT NOT NULL,
  reported BOOLEAN NOT NULL,
  helpful INT NOT NULL
);

DROP TABLE IF EXISTS answers CASCADE;
CREATE TABLE answers(
  id INT PRIMARY KEY,
  question_id INT REFERENCES questions (id),
  body TEXT NOT NULL,
  date_written DATE NOT NULL,
  answerer_name TEXT NOT NULL,
  answerer_email TEXT NOT NULL,
  reported BOOLEAN NOT NULL,
  helpful INT NOT NULL
);

DROP TABLE IF EXISTS photos;
CREATE TABLE photos(
  id INT PRIMARY KEY,
  answer_id INT REFERENCES answers (id),
  url TEXT NOT NULL
);