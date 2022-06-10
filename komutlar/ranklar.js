const { MessageEmbed } = require("discord.js");
const { Client, CommandInteraction } = require("discord.js");
const model = require("../models/guilds");
module.exports = {

  name: "ranklar",
  description: 'Davet karşılığı verilen ranklar',
  type: 1,
  options: [],
  /**
  * @param {Client} client
  * @param {CommandInteraction} interaction
  */
  run: async (client, interaction) => {
    let { ranks } = await model.findOne({ GuildID: interaction.guildId });
    if (!ranks || ranks == []) return interaction.reply("Bu sunucuda ranklarınız yok.");
    let bb = ranks.map(r => `<@&${r.rol}> => ${r.miktar} davet`).join("\n");
    const embed = new MessageEmbed()
      .setTitle(`${interaction.guild.name} Rankları`)
      .setColor("GOLD")
      .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL()}` })
      .setDescription(`${bb ? bb : "Bu sunucuda ranklarınız yok."}`);
    interaction.reply({ embeds: [embed] });
  }
};