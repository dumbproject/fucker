  // coffee commands
// if (message.conte

const fs = require('fs');

let coffee = JSON.parse(fs.readFileSync("./coffee.json", "utf8"));
console.log('coffee', coffee);
const writeToFile = () => fs.writeFile("./coffee.json", JSON.stringify(coffee), (err) =>{
  if (err) console.error(err)
});

const sip = channel => {
  if (coffee.pot === 0) {
    channel.send('The pot is empty. :(');
  } else {
    coffee.pot -= 1;
    coffee.sips += 1;
    channel.send(':coffee: sipped! ' + coffee.pot + '/5 sips left :coffee:');
  }
  console.log('coffee-->', coffee);
  writeToFile(coffee);
}

const refill = channel => {
  channel.send('You make a new pot of coffee. :coffee:\n5/5 sips left!');
  coffee.pot = 5;
  writeToFile(coffee);
}

const cups = channel => {
  channel.send('**' + (coffee.sips / 5) + '** cups of coffee have been drank.');
}
const sips = channel => {
  channel.send('**' + coffee.sips + '** sips of coffee have been taken.');
}

// const resetcoffee = channel => {
//   channel.send('that was dumb, but coffee reset. previous stats: ' + coffee.cups + ' sips ' + (coffee.sips / 5) + ' cups')
//   coffee.sips = 0;
//   coffee.pot = 5;
// }

// ########## old ############
// if (message.content.match(/resetcoffee/gi)) {
  // message.channel.send('that was dumb, but coffee reset. previous stats: ' + coffee.cups + ' sips ' + (coffee.sips / 5) + ' cups')
  // coffee.sips = 0;
  // coffee.pot = 5;
// }

module.exports = {
  sip,
  refill,
  cups,
  sips,
}
