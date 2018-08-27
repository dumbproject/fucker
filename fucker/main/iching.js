exports.create = function() {
  var lines = [];
  var sequence = [];
  var value = 0;
  var side = '';
  message.content.send('test');
  console.log('ichinging');
  for (i=0;i<6;i++) {
    for (i=0;i<3;i++) {
      if (Math.floor(Math.random()) > .5) {
        value += 3;
        side += ' tails';
      } else {
        value += 2;
        side += ' heads';
      }
    }
    var results = '  ' + side + '   ' + value.str;
    if (value % 2 === 0) {
      lines.push(results + '   -------   -------');
      sequence.push(0);
    } else {
      lines.push(results + '   -----------------');
      sequence.push(1);
    }
  }
  lines.reverse;
  message.content.send('\n');
  for (i=0;i<6;i++) {
    message.content.send(lines[i]);
  }
};
// function init() {
//   input('\n\nWelcome to your I Ching reading!\n\nWould you like to read your hexagram? (y/n) ')
//   // while input === 'y' {
//   if (process.stdin.read(y)) {
//     message.content.send('\n\n\n\n');
//     createHex();
//     message.content.send('\nlines are drawn in reverse')
//   }
// }




// process.stdin.resume();
// process.stdin.setEncoding('utf8');
// var util = require('util');
//
// process.stdin.on('data', function (text) {
//   console.log('received data:', util.inspect(text));
//   if (text === 'quit\n') {
//     done();
//   }
// });
//
// function done() {
//   console.log('Now that process.stdin is paused, there is nothing more to do.');
//   process.exit();
// }
