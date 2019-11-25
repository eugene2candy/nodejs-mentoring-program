const csvPath = './csv/node_mentoring_t1_2_input_example.csv';
const csv = require('csvtojson');

csv().fromFile(csvPath).then((jsonObj) => {
  console.log(jsonObj);
});
