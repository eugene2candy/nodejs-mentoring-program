const csvPath = './csv/node_mentoring_t1_2_input_example.csv';
const csv = require('csvtojson');
const fs = require('fs');
const { pipeline } = require('stream');

// improvement

// https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options
const writable = fs.createWriteStream('./task2.txt', 'utf8');
// https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options
const readable = fs.createReadStream(csvPath);
// https://github.com/Keyang/node-csvtojson#column-parser
// https://github.com/Keyang/node-csvtojson#header-row
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

// https://nodejs.org/api/stream.html#stream_stream_pipeline_streams_callback
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
