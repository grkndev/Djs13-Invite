const { Client, CommandInteraction } = require("discord.js");
const model = require("../models/guilds")
module.exports = {

  name: "rank-sil",
  description: 'Davet karşılığı verilen rolü kaldırırsınız',
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
    
    await model.updateOne({ GuildID: interaction.guildId }, { $pull: { ranks: { rol: rol.id, miktar: miktar } } })
    .then(() => {
      interaction.reply({ embeds: [{ title: "Başarılı", description: `${rol} rolü rankı silindi.` }] });
    })
    .catch(() => {
      interaction.reply({ embeds: [{ title: "Hata", description: `Rank Bulunamadı.` }] });
    })
    
  }
};