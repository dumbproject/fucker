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
const write2File = () => fs.writeFile("./commands/coffee.json", JSON.stringify(coffee), (err) =>{
  if (err) console.error(err)
});

let life = JSON.parse(fs.readFileSync("./life.json", "utf8"));
const writeToFile = () => fs.writeFile("./life.json", JSON.stringify(life), (err) =>{
  if (err) console.error(err)
});


client.login(private.token)
client.on('ready', () => {
  client.user.setActivity('the drums');
  console.log(chalk.magenta.bgCyan('\n    A C T I V A T E D    \n') + chalk.cyan.bgMagenta(`Logged in as ${client.user.tag} \n`));
  console.log(chalk.cyan('███████╗██╗   ██╗ ██████╗██╗  ██╗███████╗██████╗ \n██╔════╝██║   ██║██╔════╝██║ ██╔╝██╔════╝██╔══██╗\n█████╗  ██║   ██║██║     █████╔╝ █████╗  ██████╔╝\n██╔══╝  ██║   ██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗\n██║     ╚██████╔╝╚██████╗██║  ██╗███████╗██║  ██║\n╚═╝      ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝'));
  console.log(chalk.inverse(`\nThere are ${client.users.size} users in ${client.channels.size} channels of ${client.guilds.size} guilds.\n`));
  console.log(chalk.black.bgYellow('currently running on host ' + os.hostname()));
  // morning coffee sips
  // client.channels.get(private.gamb).send('yes henlo good monring i am bot. bouta take a FAT SIP of coffe');
  // if (coffee.pot === 0) {
  //   refill(client.channels.get(private.gamb))
  // }
  // sip(client.channels.get(private.gamb));
  // client.channels.get(private.gamb).send('good bean juice taste like chocolate make me go fast');
});

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

var lifetest = schedule.scheduleJob('* * * * * *', function(){
  life.time += client.uptime;
});
// var reminder = schedule.scheduleJob('0 * * * *', function(){
//   client.channels.get(private.gamb).send('```┍━━━━━━━━━━━━━━━━━━━━━━━━━✿━━━━━━━━━━━━━━━━━━━━━━━━━┑\n\n    hourly reminder!!!!! drink fucking water!!!!!\n\n┕━━━━━━━━━━━━━━━━━━━━━━━━━✿━━━━━━━━━━━━━━━━━━━━━━━━━┙```')
// });
// var weedpm = schedule.scheduleJob('20 16 * * *', function(){
//   client.channels.get(private.gamb).send('420 BLAZE IT')
// });
// var wausam = schedule.scheduleJob('20 4 * * *', function(){
//   client.channels.get(private.gamb).send('420 BLAZE IT')
// });
// var wauspm = schedule.scheduleJob('20 9 * * *', function(){
//   client.channels.get(private.gamb).send('420 BLAZE IT')
// });
// var weedam = schedule.scheduleJob('20 20 * * *', function(){
//   client.channels.get(private.gamb).send('420 BLAZE IT')
// });
let useRegEx = true;
client.on('message', (message, err) => {
  if (message.author.bot) return;
  if (err) message.channel.send(err);
  const { channel, content } = message;
  const send = string => {
    message.channel.send(string);
  }
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
// ################################################################
// ################################################################
//                         match('example')
//                               vs
//                         match(/example/)
// ################################################################
// ################################################################
  if (match('toggle')) {
    useRegEx = !useRegEx;
    console.log('useRegEx', useRegEx);
    send('useRegEx = ' + useRegEx + '\n*(true = `match(arg)`, false = `toLowerCase() === arg`)*', useRegEx);
  }
  if (match('values')) {
    send('`useRegEx = ' + useRegEx + '`');
  }

  if (match(/hmu/i)) {
    message.author.send('psst..... psssssst.......... hi');
  }

  if (match(/help/i)) {
    send('𝔉𝔘ℭ𝔎𝔈ℜ 𝔦𝔰 𝔞 𝔡𝔦𝔰𝔠𝔬𝔯𝔡 𝔟𝔬𝔱 𝔞𝔫𝔡 𝔠 𝔬 𝔣 𝔣 𝔢 𝔢   𝔞 𝔡 𝔡 𝔦 𝔠 𝔱.\ntype \'commands\' to get a list of commands.')
  }
  if (match(/commands/i)){
    send('Commands list:\n```\nhelp\ncommands\nping\nuptime upmin uphour\ntime tim timestamp\n\ncoffee sip refill cups sips\n\nassassinate blam kms snipe\n\nhi cool sup dog f say\n\nasdf\nBOO\ndie\nreboot```');
  }

  if (match(/slots/i)) {
    console.log("command called");
    var faces = [":cowboy:", ":sparkles:", ":moneybag:", ":gem:", ":coffee:", ":zzz:", ":cool:"];
    // var faces = [":cowboy:", ":sparkles:", ":moneybag:"];
    var array = new Array(9);
    function spin() {
      for (i = 0; i < array.length; i++) {
        var result = Math.floor(Math.random() * faces.length);
        array[i] = faces[result];
      }
      console.log("array => ", array);
      // array[3] = array[4] = array[5] = faces[0];
      if (array[3] === array[4] && array[4] === array[5]) {
        send("you spin the wheel! and...\n" + array[0] + " | " + array[1] + " | " + array[2] + "\n" + array[3] + " | " + array[4] + " | " + array[5] + "\n" + array[6] + " | " + array[7] + " | " + array[8] + "\nyou win!!!!!!!!!!!!! congrats");
        // send("you win!!!!!!!!!!!!!!!");
      } else {
        send("you spin the wheel! and...\n" + array[0] + " | " + array[1] + " | " + array[2] + "\n" + array[3] + " | " + array[4] + " | " + array[5] + "\n" + array[6] + " | " + array[7] + " | " + array[8] + "\nyou lose :skull: :skull: :skull:");
        // send("you lose :skull: :skull: :skull:")
      }
      // send("you spin the wheel! and...\n" + array[0] + " | " + array[1] + " | " + array[2] + "\n" + array[3] + " | " + array[4] + " | " + array[5] + "\n" + array[6] + " | " + array[7] + " | " + array[8] + "\ncongrats");
    }
    spin();
  }


  if (match(/coffee/i)) {
    send('Hi! Would you like a cup of coffee? [sip, refill, cups, sips]');
  }
  if (match(/sip/i) && !match(/sips/i)) {
    sip(channel);
  }
  if (match(/refill/i)) {
    refill(channel);
  }
  if (match(/cups/i)) {
    cups(channel);
  }
  if (match(/sips/i)) {
    sips(channel);
  }

  // exports.run = async (client, nessage, args) => {
  //   const msg = await message.channel.send('ping');
  //   msg.edit(`pong @${msg.createdTimestamp - message.createdTimestamp}ms. api latency = ${Math.round(client.ping)}ms`);
  // };
  // if (content.match(/ping/gi) && !content.match(/pings/gi)) {
  if (match(/ping/i)) {
    send('pong @' + client.ping + 'ms');
  }
  // if (content.match(/pings/i)) {
  //   send(client.pings[2]);
  // }
  if (match(/ready/i)) {
    send(message.author + "** IS READY**");
  }
  if (match(/countdown/i)) {
    console.log("countdown initiated.");
    var c = 3;
    function countdown() {
      if (c !== 0) {
        console.log(c);
        send(c);
        c = c - 1;
      } else {
        if (c === 0) {
          console.log("Timer Done!");
          send('GO');
          clearInterval(counting);
        }
      }
    }
    var counting = setInterval(countdown, 1000);
  }

  if (match('timestamp')) {
    send(timestamp());
  }
  if (match('time')) {
    // if (message.author.id === 321538982666305538) {
    //   send(time());
    // }
    // if (message.author.id === 247568161686159360) {
    //   send(tyme());
    // }
    send(time());
  }
  if (match('tyme')) {
    send(tyme());
  }
  if (match('tim')) {
    send(tim());
  }
  if (match('tym')) {
    send(tym());
  }
  // if (match('timelist')) {
  //   console.log(timelist());
  // }

  if (match(/uptime/i)) {
    send('fucker been alive for ' + client.uptime / 1000 + ' seconds');
  }
  if (match(/upmin/i)) {
    send('fucker been alive for ' + client.uptime / 60000 + ' minutes');
  }
  if (match(/uphour/i)) {
    send('fucker been alive for ' + client.uptime / 3600000 + ' hours');
  }
  if (match(/lifetime/i)) {
    send('MY WHOLE LIFE IS ONLY ' + life.time / 1000 + ' SECONDS LONG');
  }

  if (match(/hostinfo/i)) {
    send('```hostname: ' + os.hostname() + '\ntype: ' + os.type() + '\nplatform: ' + os.platform() + '\nrelease: ' + os.release() + '\nuptime: ' + (Math.floor(os.uptime() / 60)) + ' minutes```');
  }
  // if (content.match(/whoami/i)) {
  //   send(os.hostname());
  // }

  var rand = Math.floor(Math.random())

  if (match(/dice/i)) {
    var d1 = Math.floor(Math.random() * 6 + 1);
    var d2 = Math.floor(Math.random() * 6 + 1);
    send('You rolled ' + (d1 + d2) + '. (' + d1 + ' and ' + d2 + ')');
  }

  var jacket = 0;
  if (match(/\$jacket/i)) {
    jacket += 1;
    send('Indica has made ' + jacket + ' peoples\' days')
  }

  if (match(/google/i)) {
    var query = message.content.split(' ').slice(1).join('%20');
    send('https://www.google.com/search?q=' + query)
  }
  if (match(/>ssn/i)) {
    var ssn = Math.floor(Math.random() * 900 + 100) + '-' + Math.floor(Math.random() * 90 + 10) + '-' + Math.floor(Math.random() * 9000 + 1000);
    send(ssn);
  }
  if (match(/>cc/i)) {
    // var cc = Math.floor(Math.random() * 9000 + 1000) + ' ' + Math.floor(Math.random() * 9000 + 1000) + ' ' + Math.floor(Math.random() * 9000 + 1000) + ' ' + Math.floor(Math.random() * 9000 + 1000) + ' | CV: ' + Math.floor(Math.random() * 900 + 100) + ' | Expires ';
    function n() {
      return Math.floor(Math.random() * 9000 + 1000)
    }
    var cc = n() + ' ' + n() + ' ' + n() + ' ' + n() + ' | CV: ' + Math.floor(Math.random() * 900 + 100) + ' | Expires ';
    var m = Math.floor(Math.random() * 12 + 1);
    var y = Math.floor(Math.random() * 4 + 2019);
    send('`' + cc + m + '/' + y + '`');
  }
  if (match(/asdf/i)) {
    var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var word = '';
    while (word.length < 4) {
      word = word + abc[Math.floor(Math.random() * abc.length)];
    }
    message.channel.send(word);
    // console.log('word', word)
  }

  if (match(/fucker/i)) {
    send('```███████╗██╗   ██╗ ██████╗██╗  ██╗███████╗██████╗ \n██╔════╝██║   ██║██╔════╝██║ ██╔╝██╔════╝██╔══██╗\n█████╗  ██║   ██║██║     █████╔╝ █████╗  ██████╔╝\n██╔══╝  ██║   ██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗\n██║     ╚██████╔╝╚██████╗██║  ██╗███████╗██║  ██║\n╚═╝      ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝```');
  }
  if (match(/hi/i) && !match(/HI/)) {
    send('hi');
  }
  if (match(/HI/)) {
    send('HI');
  }
  if (match(/sup/i)) {
    send('not much supwitchu');
  }
  if (match(/cool/gi)) {
    send('🚨 COOL ALERT 🚨');
  }
  if (match(/dog/gi)) {
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
  if (match(/say/i)) {
    send(message.content);
  }
  if (match(/assassinate/i)) {
    var input = message.content.split(' ').slice(1).join(' ');
    send(input + ' has been killed.');
  }
  if (match(/blam/i)) {
    var input = message.content.split(' ').slice(1).join(' ');
    send(input + ' got their shit ROCKED.');
  }
  if (match(/kms/gi)) {
    send(message.author + ' has died.');
  }
  if (match(/snipe/gi)) {
    // var input = message.content.split(' ').slice(1).join(' ');
    send('(　-_･) ︻デ═一 ▸');
  }

  if (message.content === 'BOO') {
    message.delete(300).catch(fuck=>{});
    send('aaaaa!!!!!! a ghost!!!!');
    // try {
    //   let result = await dosomething()
    // } catch(e) {
    //   console.log('err', err)
    // }
  }

  if (match(/die/gi)) {
    console.log(":'(");
    var d = 1;
    function death() {
      if (d !== 0) {
        console.log(d);
        console.log("goodbye cruel world...");
        send(":skull: ack! bleh.....");
        d = d - 1;
      } else {
        if (d === 0) {
          console.log("murked");
          send('ded');
          clearInterval(dying);
          if (true) {
            murder.insert(ded);
          }
          return;
        }
      }
    }
    var dying = setInterval(death, 1000);
  }
  if (message.content.toLowerCase() === 'reboot') {
    console.log('rebooting...');
    message.channel.send('rebooting...')
    .then(msg => client.destroy())
    .then(() => client.login(private.token));
  }

});

client.on("messageDelete", (messageDelete) => {
  // messageDelete.channel.send(`The message : "${messageDelete.content}" by ${messageDelete.author.tag} was deleted.`)
  console.log(chalk.bgRed(`The message : "${messageDelete.content}" by ${messageDelete.author.tag} was deleted.`));
});
