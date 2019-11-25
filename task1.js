const process = require('process');

process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  // read string from input
  const chunk = process.stdin.read();
  // reverse the string
  const reverse = chunk.trim().split('').reverse().join('');
  // print the reversed string
  process.stdout.write(`${reverse}\n\n\n`);
});

process.stdin.on('end', () => {
  process.stdout.write('end');
});
