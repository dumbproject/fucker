const Discord = require('discord.js');
const client = new Discord.Client();
const private = require('./private.json');
const os = require('os');
// const moment = require('moment-timezone');
const schedule = require('node-schedule');
const chalk = require('chalk');
const googleimages = require('google-images');
const md5 = require('md5');
const sha256 = require('sha256');

const { refill, sip, cups, sips } = require('./commands/coffee.js');
const { timestamp, time, tim, tyme, tym } = require ('./commands/time.js');

const fs = require('fs');
let coffee = JSON.parse(fs.readFileSync("./commands/coffee.json", "utf8"));
// console.log('coffee', coffee);
const writeToFile = () => fs.writeFile("./commands/coffee.json", JSON.stringify(coffee), (err) =>{
  if (err) console.error(err)
});

function rand(num) {
  return Math.floor(Math.random() * num);
}

client.login(private.token)
client.on('ready', () => {
  client.user.setActivity('the drums');
  console.log(chalk.magenta.bgCyan('\n    A C T I V A T E D    \n') + chalk.cyan.bgMagenta(`Logged in as ${client.user.tag} \n`));
  console.log(chalk.cyan('███████╗██╗   ██╗ ██████╗██╗  ██╗███████╗██████╗ \n██╔════╝██║   ██║██╔════╝██║ ██╔╝██╔════╝██╔══██╗\n█████╗  ██║   ██║██║     █████╔╝ █████╗  ██████╔╝\n██╔══╝  ██║   ██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗\n██║     ╚██████╔╝╚██████╗██║  ██╗███████╗██║  ██║\n╚═╝      ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝'));
  console.log(chalk.inverse(`\nThere are ${client.users.size} users in ${client.channels.size} channels of ${client.guilds.size} guilds.\n`));
  console.log('currently running on host ' + os.hostname());
  // morning coffee sips
  // client.channels.get(private.gamb).send('yes henlo good monring i am bot. bouta take a FAT SIP of coffe');
  // if (coffee.pot === 0) {
  //   refill(client.channels.get(private.gamb))
  // }
  // sip(client.channels.get(private.gamb));
  // client.channels.get(private.gamb).send('good bean juice taste like chocolate make me go fast');
});

// error handling????? does this work???
client.on('error', console.error);
// client.on('error', error => {
//   console.log('ERROR:', error);
// });

client.on('typingStart', (channel, user) => {
  console.log(timestamp() + chalk.magenta(` ${user.tag}`) + ` started to type at ` + chalk.cyan(`${channel.name}`));
});
client.on('typingStop', (channel, user) => {
  console.log(timestamp() + chalk.magenta(` ${user.tag}`) + ` stopped typing at ` + chalk.cyan(`${channel.name}`));
});

var reminder = schedule.scheduleJob('0 * * * *', function(){
  client.channels.get(private.gamb).send('```┍━━━━━━━━━━━━━━━━━━━━━━━━━✿━━━━━━━━━━━━━━━━━━━━━━━━━┑\n\n    hourly reminder!!!!! drink fucking water!!!!!\n\n┕━━━━━━━━━━━━━━━━━━━━━━━━━✿━━━━━━━━━━━━━━━━━━━━━━━━━┙```')
});
// var weedam = schedule.scheduleJob('20 4 * * *', function(){
//   client.channels.get(private.gamb).send(':flag_us: 420 BLAZE IT :flag_us:')
// });
// var weedpm = schedule.scheduleJob('20 16 * * *', function(){
//   client.channels.get(private.gamb).send(':flag_us: 420 BLAZE IT :flag_us:')
// });
// var wausam = schedule.scheduleJob('20 23 * * *', function(){
//   client.channels.get(private.gamb).send(':flag_au: 420 BLAZE IT :flag_au:')
// });
// var wauspm = schedule.scheduleJob('20 11 * * *', function(){
//   client.channels.get(private.gamb).send(':flag_au: 420 BLAZE IT :flag_au:')
// });

let useRegEx = false;

client.on('message', (message, err) => {
  if (message.author.bot) return;
  if (err) message.channel.send(err);
  // fix this

  const { channel, content } = message;
  const match = arg => {
    // return message.content.match(arg);
    if (useRegEx) {
      return message.content.match(arg);
      console.log('regex');
      console.log('match --->', message.content.match(arg));
    }
    else {
      return (message.content.toLowerCase() === arg);
      console.log('===');
      console.log(message.content.toLowerCase() + '===' + arg)
    }
  }
  const send = string => {
    message.channel.send(string);
  }
  // if (message.content.indexOf(config.prefix) !== 0) return;
  // const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  // const command = args.shift().toLowerCase();

  if (match('toggle')) {
    useRegEx = !useRegEx;
    console.log('useRegEx', useRegEx);
    send('useRegEx', useRegEx);
    send(useRegEx);
  }
  if (match(/about/i)) {
    send('https://github.com/zzivnuska/fucker');
  }
  if (match(/help/i)) {
    send('𝔉𝔘ℭ𝔎𝔈ℜ 𝔦𝔰 𝔞 𝔡𝔦𝔰𝔠𝔬𝔯𝔡 𝔟𝔬𝔱 𝔞𝔫𝔡 𝔠𝔬𝔣𝔣𝔢𝔢 𝔞𝔡𝔡𝔦𝔠𝔱.\ntype the word \'commands\' to get a list of commands.')
  }
  if (match(/commands/i)){
    send('Commands list:\n```about: help, commands, ping, uptime/upmin/uphour\ninfo: time {time/tim/timestamp}\nactions: coffee {sip/refill/cups/sips}, assassinate, blam, kms, asdf\nresponses: hi, sup, cool, dog, say, f, snipe\nkill the bot: die```');
  }
  // exports.run = async (client, nessage, args) => {
  //   const msg = await message.channel.send('ping');
  //   msg.edit(`pong @${msg.createdTimestamp - message.createdTimestamp}ms. api latency = ${Math.round(client.ping)}ms`);
  // };
  // if (content.match(/ping/gi) && !content.match(/pings/gi)) {
  if (match(/ping/gi)) {
    send('pong @' + client.ping + 'ms');
  }
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
  if (match(/uptime/gi)) {
    send('fucker been alive for ' + client.uptime / 1000 + ' seconds');
  }
  if (match(/upmin/gi)) {
    send('fucker been alive for ' + client.uptime / 60000 + ' minutes');
  }
  if (match(/uphour/gi)) {
    send('fucker been alive for ' + client.uptime / 3600000 + ' hours');
  }
  if (match(/hostinfo/gi)) {
    send('```hostname: ' + os.hostname() + '\ntype: ' + os.type() + '\nplatform: ' + os.platform() + '\nrelease: ' + os.release() + '\nuptime: ' + (Math.floor(os.uptime() / 60)) + ' minutes```');
  }
  // if (content.match(/whoami/gi)) {
  //   send(os.hostname());
  // }

  if (match(/google/gi)) {
    var query = content.split(' ').slice(1).join('%20');
    send('https://www.google.com/search?q=' + query)
  }
  if (match(/goo/i)) {
  }

  if (content.match(/dice/gi)) {
    var d1 = rand(6) + 1;
    var d2 = rand(6) + 1;
    send('You rolled ' + (d1 + d2) + '. (' + d1 + ' and ' + d2 + ')');
  }

  if (content.match(/hash/i)) {
    var input = content.split(' ').slice(1).join(' ');
    send('\'' + input + '\'\nmd5 = ' + md5(input) + '\nsha256 = ' + sha256(input));
  }
  if (content.match(/>cc/gi)) {
    function n() {
      return rand(9000) + 1000;
    }
    var cc = n() + ' ' + n() + ' ' + n() + ' ' + n() + ' | CV: ' + (rand(900) + 100) + ' | Expires ';
    var m = rand(12) + 1;
    var y = rand(4) + 2019;
    send('`' + cc + m + '/' + y + '`');
  }
  if (content.match(/>ssn/gi)) {
    var ssn = rand(900) + 100 + '-' + (rand(90) + 10) + '-' + (rand(9000) + 1000);
    send(ssn);
  }
  if (content.match(/asdf/gi)) {
    var msg = content.match(/\d+/g);
    var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var word = '';
    if (msg === null) {
      while (word.length < 4) {
        word = word + abc[rand(abc.length)];
      }
    } else if (msg > 2000) {
      send('max character count === 2000');
    } else {
      while (word.length < msg) {
        word = word + abc[rand(abc.length)];
      }
    }
    send(word);
  }

  if (content.match(/fucker/gi)) {
    send('```███████╗██╗   ██╗ ██████╗██╗  ██╗███████╗██████╗ \n██╔════╝██║   ██║██╔════╝██║ ██╔╝██╔════╝██╔══██╗\n█████╗  ██║   ██║██║     █████╔╝ █████╗  ██████╔╝\n██╔══╝  ██║   ██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗\n██║     ╚██████╔╝╚██████╗██║  ██╗███████╗██║  ██║\n╚═╝      ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝```');
  }
  if (match('hi') && message.content !== 'HI') {
    send('hi');
  }
  if (match('HI')) {
    send('HI');
  }
  if (match(/sup/i)) {
    send('not much supwitchu');
  }
  if (content.match(/cool/gi)) {
    send('🚨 COOL ALERT 🚨');
  }
  if (content.match(/dog/gi)) {
    send('dog');
  }
  if (content === 'iic') {
    var c = 'cool ';
    var msg = '';
    msg = msg + c.repeat(rand(390) + 1);
    send(':sparkles: indica is ' + msg + ':sparkles:');
  }
  var jacket = 0;
  if (content.match(/\$jacket/gi)) {
    jacket += 1;
    send('Indica has made ' + jacket + ' peoples\' days')
  }
  if (content === 'f') {
    send('uck');
  }
  if (content.match(/say/i)) {
    send(content);
  }
  if (content.match(/assassinate/i)) {
    if (content.split(' ').indexOf('assassinate') === 0) {
      var input = content.split(' ').slice(1).join(' ');
      send(input + ' has been killed.');
    }
  }
  if (content.match(/blam/i)) {
    if (content.split(' ').indexOf('blam') === 0) {
      var input = content.split(' ').slice(1).join(' ');
      send(input + ' got their shit ROCKED.');
    }
  }
  if (content.match(/kms/gi)) {
    send(message.author + ' has died.');
  }
  if (content.match(/snipe/gi)) {
    send('(　-_･) ︻デ═一 ▸');
  }
  if (content.match(/perry/gi)) {
    send('https://soundcloud.com/shamanabeats/percocet-perry')
  }
  if (content.match(/wris/gi)) {
    send('https://soundcloud.com/shamanabeats/lookama-wris')
  }
  if (content.match(/god/gi)) {
    send('https://soundcloud.com/shamanabeats/sets/god-and-i-worked-things-out')
  }

  if (content.match(/coffee/i)) {
    send('Hi! Would you like a cup of coffee? [sip, refill, cups, sips]')
  }
  if (content.match(/sip/i) && !content.match(/sips/i)) {
    sip(channel)
  }
  if (content.match(/refill/i)) {
    refill(channel);
  }
  if (content.match(/cups/i)) {
    cups(channel);
  }
  if (content.match(/sips/i)) {
    sips(channel);
  }

  if (content.toLowerCase() === 'die') {
    send('ouch that hurt `lifespan: ' + client.uptime / 1000 + ' seconds`');
    console.log('deaded');
    function die() {
      console.log("\n:\'(\n");
      if (true) {
        life.insert('kill');
      }
    }
    setTimeout(die, 300)
  }
  if (message.content.toLowerCase() === 'reboot') {
    console.log('rebooting...');
    message.channel.send('rebooting...')
    .then(msg => client.destroy())
    .then(() => client.login(private.token));
  }
  // if (message.content === 'BOO') {
  //   message.delete(300).catch(fuck=>{});
  //   send('aaaaa!!!!!! a ghost!!!!')
  //     .then(msg => console.log(`Deleted message from ${msg.author.username}`))
  //     .catch(console.error);
  // }
});
// stolen
client.on('message', async message => {
  if (message.content === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  if (message.content.match(/boo/i)) {
    // var arg = message.content.split('');
    function word() {
      return message.content.toLowerCase().split(' ').slice(0);
    }
    console.log(word());
    function letters() {
      return word().split('').slice(0, 3).join('');
    }
    console.log(letters());
    if (letters() === 'boo') {
    // if (message.content.match(/boo/i)) {
      var arg = message.content.split('').slice(3);
      console.log(arg);
      message.delete(250);
      const m = await message.channel.send("aaaaaaa!!! a ghost!!");
      m.delete(500);
    }
  }
  if (message.content.match(/test/gi)) {
    message.delete(100);
    for (i=1;i<11;i++) {
      const m = await message.channel.send(i);
      m.delete(10);
    }
  }
});

client.on("messageDelete", (messageDelete) => {
  console.log(chalk.bgRed(`The message : "${messageDelete.content}" by ${messageDelete.author.tag} was deleted.`));
});
