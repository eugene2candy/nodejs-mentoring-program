const csvPath = './csv/node_mentoring_t1_2_input_example.csv';
const csv = require('csvtojson');
const fs = require('fs');

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
        fs.appendFile('task2.txt', `${JSON.stringify(p)}\n`, (err) => {
          if (err) throw err;
          console.log('write json to a txt... Done!');
        });
      });
    });
  })
  .on('close', () => {
    console.log('file was close');
  })
  .on('error', (e) => {
    console.error(e);
  });
