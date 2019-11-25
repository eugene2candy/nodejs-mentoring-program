import { stdin, stdout } from 'process';

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
