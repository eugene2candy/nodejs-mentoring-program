const csvPath = './csv/node_mentoring_t1_2_input_example.csv';
const csv = require('csvtojson');
const fs = require('fs');
const es = require('event-stream');

// csv().fromFile(csvPath).then((jsonObj) => {
// //   console.log(jsonObj);
// //   console.log(typeof jsonObj);
//   if (jsonObj) {
//     jsonObj.forEach((value) => {
//       fs.appendFile('task2.txt', `${JSON.stringify(value)}\n`, (err) => {
//         if (err) throw err;
//         console.log('write json to a txt... Done!');
//       });
//     });
//   }
// });

// remake
const writable = fs.createWriteStream('./task2.txt', 'utf8');
fs.createReadStream(csvPath)
  .on('data', (data) => {
    csv({
      noheader: false,
      headers: ['book', 'author', 'amount', 'price'],
      colParser: {
        column1: 'string',
        column2: 'string',
        column3: 'number',
        column4: 'number',
      },
      checkType: true,
    }).fromString(data.toString()).then((jsonObj) => {
      jsonObj.forEach((p) => {
        writable.write(`${JSON.stringify(p)}\n`);
      });
    });
  })
  .on('close', () => {
    console.log('file was close');
  })
  .on('error', (e) => {
    console.error(e);
  });

// // remake again
// const readable = fs.createReadStream(csvPath);
// const writable = fs.createWriteStream('./task2.txt', 'utf8');

// readable
//   .pipe(es.split())
//   .pipe(
//     es.mapSync((line) => {
//       console.log(line);
//       writable.write(line);
//     }),
//   )
//   .on('error', (e) => {
//     console.log(e);
//   });
