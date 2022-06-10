const { Client, CommandInteraction } = require("discord.js");
const model = require("../models/member")
module.exports = {

  name: "davet-ekle",
  description: 'Belirtilen kullanıcıya belirtilen miktarda davet ekler',
  type: 1,
  options: [
    {
      name: "kullanıcı",
      description: "Davet eklenicek kullanıcı",
      type: 6,
      required: true,
    },
    {
      name: "miktar",
      description: "Davet eklenicek miktar",
      type: 4,
      required: true,
      min_value: 1,
      max_value: 100,
    }
  ],
  /**
  * @param {Client} client
  * @param {CommandInteraction} interaction
  */
  run: async (client, interaction) => {
    if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return interaction.reply({embeds:[{description: "Bu komutu kullanabilmek için `Sunucuyu Yönetici` yetkisine sahip olmalısınız."}]})
    let miktar = interaction.options.getInteger("miktar");
    let kullanıcı = interaction.options.getMember("kullanıcı");

    await model.updateOne({ GuildID: interaction.guildId, MemberId: kullanıcı.id }, { $inc: { bonus: miktar } }, { upsert: true });
    interaction.reply({ embeds: [{ title: "Başarılı", description: `${kullanıcı} adlı kişiye ${miktar} kadar davet eklendi.` }] });
  }
};