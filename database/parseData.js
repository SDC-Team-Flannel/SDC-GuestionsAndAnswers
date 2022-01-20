const readline = require('readline');
const fs = require('fs');
const { insertQuestions, insertAnswers, insertPhotos } = require('./index.js');


async function parseData(fileName, database) {
  const rl = readline.createInterface({
    input: fs.createReadStream(fileName),
    crlfdelay: Infinity
  });

  let headerLine = true;
  let queryValues = '';
  let lineCount = 0;

  for await (let line of rl) {
    if (headerLine) {
      headerLine = false;
      continue;
    }
    line = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    for (let i = 0; i < line.length; i++) {
      if (line[i][0] === '"') {
        line[i] = line[i].substring(1);
      }
      if (line[i][line[i].length - 1] === '"') {
        line[i] = line[i].substring(0, line[i].length - 1);
      }
      line[i] = line[i].replaceAll("'", "''");
    }

    lineCount++;
    if (database === 'questions' || database === 'answers') {
      queryValues += `(${line[0]}, ${line[1]}, '${line[2]}', '${line[3]}', '${line[4]}', '${line[5]}', '${line[6]}', ${line[7]}), `;
    } else if (database === 'photos') {
      queryValues += `(${line[0]}, ${line[1]}, '${line[2]}'), `;
    }

    if (lineCount === 1000) {
      await submitQuery(queryValues, database);
      queryValues = '';
      lineCount = 0;
    }
  }

  if (queryValues.length > 0) {
    await submitQuery(queryValues, database);
  }
}

async function submitQuery(queryValues, database) {
  queryValues = queryValues.substring(0, queryValues.length - 2);
  queryValues += ';';
  if (database === 'questions') {
    await insertQuestions(queryValues);
  } else if (database === 'answers') {
    insertAnswers(queryValues);
  } else if (database === 'photos') {
    insertPhotos(queryValues);
  }
}

async function startETL() {
  await parseData('./importedData/questions.csv', 'questions');
  await parseData('./importedData/answers.csv', 'answers');
  await parseData('./importedData/answers_photos.csv', 'photos');
}


module.exports = {startETL}