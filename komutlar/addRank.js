const { Client, CommandInteraction,Permissions } = require("discord.js");
const model = require("../models/guilds")
module.exports = {

  name: "rank-ekle",
  description: 'Davet karşılığı verilecek rol ayarlarsınız',
  type: 1,
  options: [
    {
      name: "rol",
      description: "Verilecek Rol",
      type: 8,
      required: true,
    },
    {
      name: "miktar",
      description: "Kaç davet yapıldığında verilecek",
      type: 4,
      required: true,
    }
  ],
  /**
  * @param {Client} client
  * @param {CommandInteraction} interaction
  */
  run: async (client, interaction) => {
    if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return interaction.reply({embeds:[{description: "Bu komutu kullanabilmek için `Sunucuyu Yönetici` yetkisine sahip olmalısınız."}]})
    let rol = interaction.options.getRole("rol");
    let miktar = interaction.options.getInteger("miktar");
    await model.updateOne({ GuildID: interaction.guildId }, { $push: { ranks: { rol: rol.id, miktar: miktar } } }, { upsert: true });
    interaction.reply({ embeds: [{ title: "Başarılı", description: `${rol} rolü ${miktar} davet karşılığına verilecek.` }] });
  }
};