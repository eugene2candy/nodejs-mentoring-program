import { stdin, stdout } from 'process';
import csv from 'csvtojson';
import fs from 'fs';

// task1
stdin.setEncoding('utf8');
stdin.on('readable', () => {
  // read string from input
  const chunk = stdin.read();
  // reverse the string
  const reverse = chunk.trim().split('').reverse().join('');
  // print the reversed string
  stdout.write(`${reverse}\n\n\n`);
});
stdin.on('end', () => {
  stdout.write('end');
});

// task2
const csvPath = './csv/node_mentoring_t1_2_input_example.csv';
// csv().fromFile(csvPath).then((jsonObj) => {
//   if (jsonObj) {
//     jsonObj.forEach((value) => {
//       fs.appendFile('re_task2.txt', `${JSON.stringify(value)}\n`, (err) => {
//         if (err) throw err;
//       });
//     });
//   }
// });
const writable = fs.createWriteStream('./re_task2.txt', 'utf8');
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
