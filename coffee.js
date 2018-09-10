// coffee commands
// if (message.conte

const fs = require('fs');

let coffee = JSON.parse(fs.readFileSync("./coffee.json", "utf8"));
console.log('coffee', coffee);
const writeToFile = () => fs.writeFile("./coffee.json", JSON.stringify(coffee), (err) =>{
  if (err) console.error(err)
});

const handleSip = channel => {
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

module.exports = {
  handleSip,
}
