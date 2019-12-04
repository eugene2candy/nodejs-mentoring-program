import { stdin, stdout } from 'process';
import csv from 'csvtojson';
import fs from 'fs';
import { pipeline } from 'stream';

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
const writable = fs.createWriteStream('./re_task2.txt', 'utf8');
const readable = fs.createReadStream(csvPath);
const csvStream = csv({
  noheader: false,
  headers: ['book', 'author', 'amount', 'price'],
  colParser: {
    column1: 'string',
    column2: 'string',
    column3: 'number',
    column4: 'number',
  },
  checkType: true,
});
pipeline(
  readable,
  csvStream,
  writable,
  (e) => {
    if (e) {
      console.error(e);
    }
  },
);
