exports.run = async (client, nessage, args) => {
  const msg = await message.channel.send('ping');
  msg.edit(`pong @${msg.createdTimestamp - message.createdTimestamp}ms. api latency = ${Math.round(client.ping)}ms`);
};
// if (message.content.match(/ping/gi)) {
//   message.channel.send('pong @' + client.ping + 'ms');
// }
