const csvPath = './csv/node_mentoring_t1_2_input_example.csv';
const csv = require('csvtojson');
const fs = require('fs');

csv().fromFile(csvPath).then((jsonObj) => {
//   console.log(jsonObj);
//   console.log(typeof jsonObj);
  if (jsonObj) {
    jsonObj.forEach((value) => {
      fs.appendFile('task2.txt', `${JSON.stringify(value)}\n`, (err) => {
        if (err) throw err;
        console.log('write json to a txt... Done!');
      });
    });
  }
});
