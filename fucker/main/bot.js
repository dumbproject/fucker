const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const chalk = require('chalk');
const private = require('./private.json');
let coffee = JSON.parse(fs.readFileSync("./coffee.json", "utf8"));
// const coffee = require('./coffee.json');
// const prefix = "";
// const iching = require('./iching.js');

// login
client.login(private.token)
client.on('ready', () => {
  console.log(chalk.black.bgRed('\n    A C T I V A T E D    '));
  console.log(chalk.blue.bgMagenta(`Logged in as ${client.user.tag} \n`));
  client.user.setActivity('being a difficult bot');
  // message.channel.send('i\'m alive!');
});

// listener
client.on('typingStart', (channel, user) => {
  // console.log(`${user.tag} started to type at ${channel.name}`);
  console.log(chalk.magenta(`${user.tag}`) + ` started to type at ` + chalk.cyan(`${channel.name}`));
});
client.on('typingStop', (channel, user) => {
  console.log(chalk.magenta(`${user.tag}`) + ` stopped typing at ` + chalk.cyan(`${channel.name}`));
});

// commands
client.on('message', message => {
  if (message.author.bot) return;
  // switch(message.content.toLowerCase()) {
   // case '':
   // resetBot(message.channel);
   // break;
  // }

  // let string = message.content;
  // .replace(/^[abc|0-9|\s+]|[abc|0-9|\s+]$/gm, '')
  // if (message.content.toLowerCase() === 'help') {
  if (message.content.match(/help/gi)) {
    message.channel.send('Commands list:\n                     - help\n                     - ping\n                     - coffee\n                         > sip\n                         > refill\n                         > cups\n                     - die');
  }
  // if (message.content.toLowerCase() === 'ping') {
  if (message.content.match(/ping/gi)) {
    message.channel.send('pong @' + client.ping + 'ms');
  }

// coffee commands
  // if (message.content.toLowerCase() === 'coffee') {
  if (message.content.match(/coffee/gi)) {
    message.channel.send('Hi! Would you like a cup of coffee? [sip, refill, cups, sips]')
  }
  // if (message.content.toLowerCase() === 'sip') {
  if (message.content.match(/sip/gi) && !message.content.match(/sips/gi)) {
    if (coffee.pot === 0) {
      message.channel.send('The pot is empty. :(');
    } else {
      coffee.pot -= 1;
      coffee.sips += 1;
      message.channel.send(':coffee: sipped! ' + coffee.pot + '/5 sips left :coffee:');
    }
  }
  // if (message.content.toLowerCase() === 'refill') {
  if (message.content.match(/refill/gi)) {
    message.channel.send('You make a new pot of coffee. :coffee:\n5/5 sips left!');
    coffee.pot = 5;
  }
  // if (message.content.toLowerCase() === 'cups') {
  if (message.content.match(/cups/gi)) {
    message.channel.send('**' + (coffee.sips / 5) + '** cups of coffee have been drank.');
  }
  // if (message.content.toLowerCase() === 'sips') {
  if (message.content.match(/sips/gi)) {
    message.channel.send('**' + coffee.sips + '** sips of coffee have been taken.');
  }
  // if (message.content.toLowerCase() === 'resetcoffee') {
  if (message.content.match(/resetcoffee/gi)) {
    message.channel.send('that was dumb, but coffee reset. previous stats: ' + coffee.cups + ' sips ' + (coffee.sips / 5) + ' cups')
    coffee.sips = 0;
    coffee.pot = 5;
  }
  fs.writeFile("./coffee.json", JSON.stringify(coffee), (err) =>{
    if (err) console.error(err)
  });

  // if (message.content === 'iching') {
  //   iching.create;
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


  // for (i=0;i<1;i++) {
  //   message.channel.send('ACTIVATED');
  // }
  // if (message.content.toLowerCase() === 'say') {
  //   message.channel.send('/tts ' + query)
  // }

  // if (message.content === 'p!slots') {
  //   message.channel.send('p!slots');
  // }
  // if (message.content === 'recursive') {
  //   if (message.content === 'STOP') {
  //     return;
  //   } else {
  //     message.channel.send('recursive');
  //   }
  // }


  // if (message.content === '') {
  //   message.channel.send('');
  // }


// unused
// var truth = true;
// while (truth === true) {
//   for (i = 0; i < 100; i++) {
//     setTimeout(function(){
//       message.channel.send('hourly reminder to drink water!!!!');
//     }, 10000);
//   }
// }
