exports.run = async (client, message, args, level) => {
  const msg = await message.channel.send()
  
};


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
