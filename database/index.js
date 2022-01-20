require('dotenv').config({path: '.env'});
const {Pool} = require('pg');

const pool = new Pool({
  "user": process.env.PG_USER,
  "password": process.env.PG_PASSWORD,
  "host": process.env.PG_HOST,
  "port": process.env.PG_PORT,
  "database": process.env.PG_DATABASE
});

const insertQuestions = async (data) => {
  await pool.query(`INSERT INTO questions (id, product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES ${data}`, (err, res) => {
    if (err) {
      console.log(err);
    }
  })
}

const insertAnswers = async (data) => {
  await pool.query(`INSERT INTO answers (id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES ${data}`, (err, res) => {
    if (err) {
      console.log(err);
    }
  })
}

const insertPhotos = async (data) => {
  await pool.query(`INSERT INTO photos (id, answer_id, url) VALUES ${data}`, (err, res) => {
    if (err) {
      console.log(err);
    }
  })
}


module.exports = {insertQuestions, insertAnswers, insertPhotos};