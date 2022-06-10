const { Client, CommandInteraction } = require("discord.js");

module.exports = {

  name: "ping",
  description: 'botun gecikemsi',
  type: 1,
  options: [],
  /**
  * @param {Client} client
  * @param {CommandInteraction} interaction
  */
  run: async (client, interaction) => {
    interaction.reply(`${client.ws.ping} ms`)
  }
};