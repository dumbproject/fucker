const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment-timezone');
const chalk = require('chalk');
const private = require('./private.json');
// const cowsay = require('./cowsay.json');
const { refill, sip, cups, sips } = require('./coffee.js');

// login
client.login(private.token)
client.on('ready', () => {
  console.log(chalk.black.bgRed('\n    A C T I V A T E D    '));
  console.log(chalk.blue.bgMagenta(`Logged in as ${client.user.tag} \n`));
  client.user.setActivity('with the coffee machine');
});

client.on('error', error => {
  console.log('ERROR:', error);
});


// listener
client.on('typingStart', (channel, user) => {
  console.log(timestamp() + chalk.magenta(` ${user.tag}`) + ` started to type at ` + chalk.cyan(`${channel.name}`));
});
client.on('typingStop', (channel, user) => {
  console.log(timestamp() + chalk.magenta(` ${user.tag}`) + ` stopped typing at ` + chalk.cyan(`${channel.name}`));
});



var timestamp = () => moment().format('YYYY-MM-DD hh:mm:ss.SS A zz');
var time = () => moment().tz('America/Los_Angeles').format('h:mm:ss A zz YYYY-MM-DD');
var tim = () => moment().tz('America/Los_Angeles').format('h:mma zz');
var tyme = () => moment().tz('Australia/Sydney').format('h:mm:ss A zz YYYY-MM-DD');
var tym = () => moment().tz('Australia/Sydney').format('h:mma zz');
// var timestamp = () => moment().format('YYYY-MM-DD hh:mm:ss.SS A zz');

let useRegEx = false;

// commands
client.on('message', (message, err) => {
  // fix this
  if (err) message.channel.send(err);

  // is this working 100%?
  const { channel, content } = message;

  // ignore bots
  if (message.author.bot) return;

  const match = arg => {
    if (useRegEx) {
      return message.content.match(arg);
      // console.log('regex')
      // console.log('match --->', message.content.match(arg));
    }
    else {
      return (message.content.toLowerCase() === arg);
      // console.log('===')
      // console.log(message.content.toLowerCase() + '===' + arg)
    }
  }
  const send = string => {
    message.channel.send(string);
  }

  if (match('toggle')) {
    useRegEx = !useRegEx;
    console.log('useRegEx', useRegEx);
  }

  // if (message.content.match(/cowsay/gi)) {
  //   message.channel.send(cowsay.moo)
  // }
  if (content.match(/help/gi)) {
    send('Commands list:\n[toggle, help, ping, time {timestamp/time/tim/tyme/tym}, cool, hi, dog, f, say, sup, assassinate, blam, kms, snipe, asdf, coffee {sip/refill/cups/sips}, die]');
  }
  // if (content.match(/ping/gi) && !content.match(/pings/gi)) {
  if (content.match(/ping/gi)) {
    send('pong @' + client.ping + 'ms');
  }
  // if (content.match(/pings/gi)) {
  //   send(client.pings[2]);
  // }
  if (match('timestamp')) {
    send(timestamp());
  }
  if (match('time')) {
    send(time());
  }
  if (match('tim')) {
    send(tim());
  }
  if (match('tyme')) {
    send(tyme());
  }
  if (match('tym')) {
    send(tym());
  }
  // if (match('timelist')) {
  //   console.log(timelist());
  // }
  if (message.content.match(/cool/gi)) {
    send('🚨 COOL ALERT 🚨');
  }
  if (message.content.match(/hi/gi)) {
    send('hi');
  }
  if (message.content.match(/dog/gi)) {
    send('dog');
  }
  // if (message.content === 'c') {
  //   var cool = 'cool ';
  //   var rand = Math.floor(Math.random * 20);
  //   message.channel.send(':sparkles: indica is ' + cool.repeat(rand) + ':sparkles:');
  // }
  if (message.content === 'f') {
    send('uck');
  }
  if (message.content.match(/say/gi)) {
    send(message.content);
  }
  if (content.match(/sup/gi)) {
    send('not much supwitchu');
  }

  // if (content === 'ssn') {
  //   var digit = Math.floor(Math.random * 4);
  //   var ssn = digit + digit + digit + '-' + digit + digit + '-' + digit + digit + digit + digit;
  //   send(ssn);
  // }
  // if (content === 'cc' {
  //   send();
  // }

  if (content.match(/assassinate/gi)) {
    var input = message.content.split(' ').slice(1).join(' ');
    send(input + ' has been killed.');
  }
  if (content.match(/blam/gi)) {
    var input = message.content.split(' ').slice(1).join(' ');
    send(input + ' got their shit ROCKED.');
  }
  if (content.match(/kms/gi)) {
    send(message.author + ' has died.');
  }
  if (content.match(/snipe/gi)) {
    // var input = message.content.split(' ').slice(1).join(' ');
    send('(　-_･) ︻デ═一 ▸');
  }
  // if (content.match(/kiss/gi)) {
  //   send(':shamaDab: ' + message.content + ' :shamaKiss:');
  // }
  if (content.match(/perry/gi)) {
    send('https://soundcloud.com/shamanabeats/percocet-perry')
  }
  if (content.match(/wris/gi)) {
    send('https://soundcloud.com/shamanabeats/lookama-wris')
  }
  if (content.match(/god/gi)) {
    send('https://soundcloud.com/shamanabeats/sets/god-and-i-worked-things-out')
  }


  if (content.match(/asdf/gi)) {
    var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var word = '';
    while (word.length < 4) {
      word = word + abc[Math.floor(Math.random() * abc.length)];
    }
    message.channel.send(word);
    // console.log('word', word)
  }
  // #####################################################################################################
  // #####################################################################################################
  // #####################################################################################################
  // #####################################################################################################
// coffee commands
  // if (message.content.toLowerCase() === 'coffee') {
  if (message.content.match(/coffee/gi)) {
    send('Hi! Would you like a cup of coffee? [sip, refill, cups, sips]')
  }

  if (content.match(/sip/gi) && !content.match(/sips/gi)) {
    sip(channel)
  }
  if (content.match(/refill/gi)) {
    refill(channel);
  }
  if (content.match(/cups/gi)) {
    cups(channel);
  //   message.channel.send('**' + (coffee.sips / 5) + '** cups of coffee have been drank.');
  }
  if (content.match(/sips/gi)) {
    // message.channel.send('**' + coffee.sips + '** sips of coffee have been taken.');
    sips(channel);
  }
  // // if (message.content.toLowerCase() === 'resetcoffee') {
  // if (message.content.match(/resetcoffee/gi)) {
  //   message.channel.send('that was dumb, but coffee reset. previous stats: ' + coffee.cups + ' sips ' + (coffee.sips / 5) + ' cups')
  //   coffee.sips = 0;
  //   coffee.pot = 5;
  // }
  // #####################################################################################################
  // #####################################################################################################

  if (message.content.toLowerCase() === 'die') {
    console.log(":\'(");
    setTimeout(function(){
      console.log("test");
    }, 2000);
    if (true) {
      death.insert('death');
    }
    if (message.content.toLowerCase() === 'reboot') {
      console.log('rebooting...');
      message.channel.send('rebooting...')
      .then(msg => client.destroy())
      .then(() => client.login(private.token));
    }
  }
});
