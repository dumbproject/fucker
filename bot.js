const Discord = require('discord.js');
const client = new Discord.Client();
const private = require('./private.json');
const os = require('os');
// const moment = require('moment-timezone');
const schedule = require('node-schedule');
const chalk = require('chalk');
const { refill, sip, cups, sips } = require('./commands/coffee.js');
const { timestamp, time, tim, tyme, tym } = require ('./commands/time.js');

const fs = require('fs');
let coffee = JSON.parse(fs.readFileSync("./commands/coffee.json", "utf8"));
// console.log('coffee', coffee);
const writeToFile = () => fs.writeFile("./commands/coffee.json", JSON.stringify(coffee), (err) =>{
  if (err) console.error(err)
});

const oshostname = os.hostname();
const ostype = os.type();
const osplatform = os.platform();
const osrelease = os.release();
const osuptime = os.uptime();
// special channel id's
const gamb = '442797683955073025';
const test = '481614978437218329';

// 1. login
// #############################################################################
client.login(private.token)
client.on('ready', () => {
  client.user.setActivity('the drums');
  console.log(chalk.magenta.bgCyan('\n    A C T I V A T E D    \n') + chalk.cyan.bgMagenta(`Logged in as ${client.user.tag} \n`));
  console.log(chalk.cyan('███████╗██╗   ██╗ ██████╗██╗  ██╗███████╗██████╗ \n██╔════╝██║   ██║██╔════╝██║ ██╔╝██╔════╝██╔══██╗\n█████╗  ██║   ██║██║     █████╔╝ █████╗  ██████╔╝\n██╔══╝  ██║   ██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗\n██║     ╚██████╔╝╚██████╗██║  ██╗███████╗██║  ██║\n╚═╝      ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝'));
  console.log(chalk.inverse(`\nThere are ${client.users.size} users in ${client.channels.size} channels of ${client.guilds.size} guilds.\n`));

  // morning coffee sips
  client.channels.get(gamb).send('yes henlo good monring i am bot. bouta take a FAT SIP of coffe');
  if (coffee.pot === 0) {
    refill(client.channels.get(gamb))
  }
  sip(client.channels.get(gamb));
  client.channels.get(gamb).send('good bean juice taste like chocolate make me go fast');
  // console.log('currently running on host ' + oshostname);
});

// error handling????? does this work???
client.on('error', console.error);
// client.on('error', error => {
//   console.log('ERROR:', error);
// });

// 2. listener
// #############################################################################
client.on('typingStart', (channel, user) => {
  console.log(timestamp() + chalk.magenta(` ${user.tag}`) + ` started to type at ` + chalk.cyan(`${channel.name}`));
});
client.on('typingStop', (channel, user) => {
  console.log(timestamp() + chalk.magenta(` ${user.tag}`) + ` stopped typing at ` + chalk.cyan(`${channel.name}`));
});

// 3. scheduler
// #############################################################################
var reminder = schedule.scheduleJob('0 * * * *', function(){
  client.channels.get(gamb).send('```┍━━━━━━━━━━━━━━━━━━━━━━━━━✿━━━━━━━━━━━━━━━━━━━━━━━━━┑\n\n    hourly reminder!!!!! drink fucking water!!!!!\n\n┕━━━━━━━━━━━━━━━━━━━━━━━━━✿━━━━━━━━━━━━━━━━━━━━━━━━━┙```')
});
var weedpm = schedule.scheduleJob('20 16 * * *', function(){
  client.channels.get(gamb).send('420 BLAZE IT')
});
var wausam = schedule.scheduleJob('20 4 * * *', function(){
  client.channels.get(gamb).send('420 BLAZE IT')
});
var wauspm = schedule.scheduleJob('20 9 * * *', function(){
  client.channels.get(gamb).send('420 BLAZE IT')
});
var weedam = schedule.scheduleJob('20 20 * * *', function(){
  client.channels.get(gamb).send('420 BLAZE IT')
});

let useRegEx = false;

// 4. commands
// #############################################################################
client.on('message', (message, err) => {
  if (message.author.bot) return;
  if (err) message.channel.send(err);
  // fix this

  // condense necessary parameters
  // is this working 100%?
  const { channel, content } = message;
  // condense necessary parameters pt. 2
  const send = string => {
    message.channel.send(string);
  }


  // if (message.content.indexOf(config.prefix) !== 0) return;
  // change to private.prefix, also set prefix

  // const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  // const command = args.shift().toLowerCase();

  // fiddling w switching between using regex (for global + case insensitive) and exact matching (more traditional, in line with using a prefix)
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
  if (match('toggle')) {
    useRegEx = !useRegEx;
    console.log('useRegEx', useRegEx);
    send('useRegEx', useRegEx);
  }
  // #############################################################################
  // end intro bullshit, start command responses

  if (content.match(/help/gi)) {
    send('𝔉𝔘ℭ𝔎𝔈ℜ 𝔦𝔰 𝔞 𝔡𝔦𝔰𝔠𝔬𝔯𝔡 𝔟𝔬𝔱 𝔞𝔫𝔡 𝔠𝔬𝔣𝔣𝔢𝔢 𝔞𝔡𝔡𝔦𝔠𝔱.\ntype the word \'commands\' to get a list of commands.')
  }
  if (content.match(/commands/gi)){
    send('Commands list:\n```about: help, commands, ping, uptime/upmin/uphour\ninfo: time {time/tim/timestamp}\nactions: coffee {sip/refill/cups/sips}, assassinate, blam, kms, asdf\nresponses: hi, sup, cool, dog, say, f, snipe\nkill the bot: die```');
  }


  if (message.content === 'BOO') {
    message.delete(300).catch(fuck=>{});
    send('aaaaa!!!!!! a ghost!!!!');
    try {
      let result = await dosomething()
    } catch(e) {
      console.log('err', err)
    }
  }




  var jacket = 0;
  if (content.match(/\$jacket/gi)) {
    jacket += 1;
    send('Indica has made ' + jacket + ' peoples\' days')
  }



  // exports.run = async (client, nessage, args) => {
  //   const msg = await message.channel.send('ping');
  //   msg.edit(`pong @${msg.createdTimestamp - message.createdTimestamp}ms. api latency = ${Math.round(client.ping)}ms`);
  // };
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

  if (content.match(/uptime/gi)) {
    send('fucker been alive for ' + client.uptime / 1000 + ' seconds');
  }
  if (content.match(/upmin/gi)) {
    send('fucker been alive for ' + client.uptime / 60000 + ' minutes');
  }
  if (content.match(/uphour/gi)) {
    send('fucker been alive for ' + client.uptime / 3600000 + ' hours');
  }

  if (content.match(/hostinfo/gi)) {
    send('```hostname: ' + oshostname + '\ntype: ' + ostype + '\nplatform: ' + osplatform + '\nrelease: ' + osrelease + '\nuptime: ' + (Math.floor(osuptime / 60)) + ' minutes```');
  }
  // if (content.match(/whoami/gi)) {
  //   send(os.hostname());
  // }

  if (content.match(/google/gi)) {
    var str = message.content;
    var query = str.match()
    send('https://www.google.com/search?q=' + message.content)
  }


  var rand = Math.floor(Math.random())
  if (content.match(/dice/gi)) {
    var d1 = Math.floor(Math.random() * 6 + 1);
    var d2 = Math.floor(Math.random() * 6 + 1);
    send('You rolled ' + (d1 + d2) + '. (' + d1 + ' and ' + d2 + ')');
  }
  if (content.match(/cc/gi)) {
    // var cc = Math.floor(Math.random() * 9000 + 1000) + ' ' + Math.floor(Math.random() * 9000 + 1000) + ' ' + Math.floor(Math.random() * 9000 + 1000) + ' ' + Math.floor(Math.random() * 9000 + 1000) + ' | CV: ' + Math.floor(Math.random() * 900 + 100) + ' | Expires ';
    function n() {
      return Math.floor(Math.random() * 9000 + 1000)
    }
    var cc = n() + ' ' + n() + ' ' + n() + ' ' + n() + ' | CV: ' + Math.floor(Math.random() * 900 + 100) + ' | Expires ';
    var m = Math.floor(Math.random() * 12 + 1);
    if (m === 4 || 6 || 9 || 11) {
      var d = Math.floor(Math.random() * 30 + 1);
    } else if (m === 2) {
      var d = Math.floor(Math.random() * 28 + 1);
    } else {
      var d = Math.floor(Math.random() * 31 + 1);
    }
    send('`' + cc + m + '/' + d + '`');
  }
  if (content.match(/ssn/gi)) {
    var ssn = Math.floor(Math.random() * 900 + 100) + '-' + Math.floor(Math.random() * 90 + 10) + '-' + Math.floor(Math.random() * 9000 + 1000);
    send(ssn);
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


  if (content.match(/fucker/gi)) {
    send('```███████╗██╗   ██╗ ██████╗██╗  ██╗███████╗██████╗ \n██╔════╝██║   ██║██╔════╝██║ ██╔╝██╔════╝██╔══██╗\n█████╗  ██║   ██║██║     █████╔╝ █████╗  ██████╔╝\n██╔══╝  ██║   ██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗\n██║     ╚██████╔╝╚██████╗██║  ██╗███████╗██║  ██║\n╚═╝      ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝```');
  }

  if (content.match(/hi/gi) && !content.match(/HI/g)) {
    send('hi');
  }
  if (content.match(/HI/g)) {
    send('HI');
  }
  if (content.match(/sup/gi)) {
    send('not much supwitchu');
  }
  if (content.match(/cool/gi)) {
    send('🚨 COOL ALERT 🚨');
  }
  if (content.match(/dog/gi)) {
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

  // if (content === 'ssn') {
  //   var digit = Math.floor(Math.random * 4);
  //   var ssn = digit + digit + digit + '-' + digit + digit + '-' + digit + digit + digit + digit;
  //   send(ssn);
  // }
  // if (content === 'cc' {
  //   send();
  // }

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
  }
  if (content.match(/sips/gi)) {
    sips(channel);
  }


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

client.on("messageDelete", (messageDelete) => {
  // messageDelete.channel.send(`The message : "${messageDelete.content}" by ${messageDelete.author.tag} was deleted.`)
  console.log(chalk.bgRed(`The message : "${messageDelete.content}" by ${messageDelete.author.tag} was deleted.`));
});
