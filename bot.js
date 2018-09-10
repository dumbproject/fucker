const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
const chalk = require('chalk');
const private = require('./private.json');
// const cowsay = require('./cowsay.json');
const { handleSip } = require('./coffee.js');

// login
client.login(private.token)
client.on('ready', () => {
  console.log(chalk.black.bgRed('\n    A C T I V A T E D    '));
  console.log(chalk.blue.bgMagenta(`Logged in as ${client.user.tag} \n`));
  client.user.setActivity('with the coffee machine');
});


var timestamp = () => moment().format('YYYY-MM-DD hh:mm:ss.SS A');

// listener
client.on('typingStart', (channel, user) => {
  console.log(timestamp() + chalk.magenta(` ${user.tag}`) + ` started to type at ` + chalk.cyan(`${channel.name}`));
});
client.on('typingStop', (channel, user) => {
  console.log(timestamp() + chalk.magenta(` ${user.tag}`) + ` stopped typing at ` + chalk.cyan(`${channel.name}`));
});

const MESSAGE_HELP = 'Commands list:\n[help, ping, coffee {sip, refill, cups}, die]';
let useRegEx = false;

// commands
client.on('message', message => {
  if (message.author.bot) return;
  const { channel, content } = message;

  const match = arg => {
    if (useRegEx) {
      console.log('regex')
      // console.log('match --->', message.content.match(arg));
      return message.content.match(arg);
    }
    else {
      console.log('===')
      // console.log(message.content.toLowerCase() + '===' + arg)
      return (message.content.toLowerCase() === arg);
    }
  }
  const send = string => {
    message.channel.send(string);
  }

  if (match('toggle')) {
    useRegEx = !useRegEx;
    console.log('useRegEx', useRegEx);
  }

  if (match(/help/gi))
    send(MESSAGE_HELP);
  // if (message.content.toLowerCase() === 'ping') {
  if (message.content.match(/ping/gi)) {
    message.channel.send('pong @' + client.ping + 'ms');
  }
  // if (message.content.match(/cowsay/gi)) {
  //   message.channel.send(cowsay.moo)
  // }

  if (match('time')) {
    send(timestamp());
  }
  if (message.content.match(/cool/gi)) {
    message.channel.send('🚨 COOL ALERT 🚨')
  }
  if (message.content.match(/hi/gi)) {
    message.channel.send('hi')
  }
  if (message.content.match(/say/gi)) {
    message.channel.send(message.content);
  }
  if (message.content.match(/sup/gi)) {
    message.channel.send('not much supwitchu');
  }
  if (message.content.match(/asdf/gi)) {
    var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var word = '';
    var maxChars = 4;
    while (word.length < maxChars) {
      word = word + abc[Math.floor(Math.random() * abc.length)];
    }
    console.log('word', word)
    message.channel.send(word);
  }

// coffee commands
  // if (message.content.toLowerCase() === 'coffee') {
  if (message.content.match(/coffee/gi)) {
    message.channel.send('Hi! Would you like a cup of coffee? [sip, refill, cups, sips]')
  }



  // if (message.content.toLowerCase() === 'sip') {
  if (content.match(/sip/gi) && !content.match(/sips/gi)) {
    handleSip(channel)
  }
  // // if (message.content.toLowerCase() === 'refill') {
  // if (message.content.match(/refill/gi)) {
  //   message.channel.send('You make a new pot of coffee. :coffee:\n5/5 sips left!');
  //   coffee.pot = 5;
  // }
  // // if (message.content.toLowerCase() === 'cups') {
  // if (message.content.match(/cups/gi)) {
  //   message.channel.send('**' + (coffee.sips / 5) + '** cups of coffee have been drank.');
  // }
  // // if (message.content.toLowerCase() === 'sips') {
  // if (message.content.match(/sips/gi)) {
  //   message.channel.send('**' + coffee.sips + '** sips of coffee have been taken.');
  // }
  // // if (message.content.toLowerCase() === 'resetcoffee') {
  // if (message.content.match(/resetcoffee/gi)) {
  //   message.channel.send('that was dumb, but coffee reset. previous stats: ' + coffee.cups + ' sips ' + (coffee.sips / 5) + ' cups')
  //   coffee.sips = 0;
  //   coffee.pot = 5;
  // }

  if (message.content.toLowerCase() === 'die') {
  // if (message.content.match(/die/gi)) {
    console.log(":\'(");
    setTimeout(function(){
      console.log("test");
    }, 2000);
    if (coffee >= 0) {
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
