const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment-timezone');

var timestamp = () => moment().format('YYYY-MM-DD hh:mm:ss.SS A zz');
var time = () => moment().tz('America/Los_Angeles').format('h:mm:ss A zz YYYY-MM-DD (ddd)');
var tim = () => moment().tz('America/Los_Angeles').format('h:mma zz');
var tyme = () => moment().tz('Australia/Sydney').format('h:mm:ss A zz YYYY-MM-DD (ddd)');
var tym = () => moment().tz('Australia/Sydney').format('h:mma zz');

// client.on('message', (message, err) => {
//   const { channel, content } = message;
//   const send = string => {
//     message.channel.send(string);
//   }
//   if (match('timestamp')) {
//     send(timestamp());
//   }
//   if (match('time')) {
//     send(time());
//   }
//   if (match('tim')) {
//     send(tim());
//   }
//   if (match('tyme')) {
//     send(tyme());
//   }
//   if (match('tym')) {
//     send(tym());
//   }
// });

module.exports = {
  timestamp,
  time,
  tim,
  tyme,
  tym,
}
