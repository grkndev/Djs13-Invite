const { Client, CommandInteraction } = require("discord.js");
const model = require("../models/guilds");
module.exports = {

  name: "hoşgeldin-mesaj",
  description: 'Sunucuya katıldığında gönderilecek mesajı ayarlarsınız',
  type: 1,
  options: [
    {
      name: "ayarla",
      description: "Hoşgeldin mesajını ayarlar",
      type: 1,
      options: [{ name: "mesaj", description: "Hoşgeldin mesajı", type: 3, required: true }],
    },
    {
      name: "sıfırla",
      description: "Hoşgeldin mesajını siler",
      type: 1,
      options: [],
    },
  ],
  /**
  * @param {Client} client
  * @param {CommandInteraction} interaction
  */
  run: async (client, interaction) => {
    if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return interaction.reply({embeds:[{description: "Bu komutu kullanabilmek için `Sunucuyu Yönetici` yetkisine sahip olmalısınız."}]})
    if (interaction.options.getSubcommand() == "ayarla") {
      let mesaj = interaction.options.getString("mesaj")
        .replace("{kullanıcı.tag}", client.user.tag)
        .replace("{kullanıcı.username}", client.user.username)
        .replace("{kullanıcı}", client.user)
        .replace("{davetEden.tag}", interaction.member.user.tag)
        .replace("{davetEden.username}", interaction.member.user.username)
        .replace("{davetEden}", interaction.member)
        .replace("{sunucu-adı}", interaction.guild.name)
        .replace("{sunucu-toplamÜye}", interaction.guild.memberCount)
        .replace("{davet-kodu}", `rabel`)
        .replace("{davet}", `https://discord.gg/rabel`)
        .replace("{kullanım}", Math.floor(Math.random() * 100) + 1);

      await model.updateOne({ GuildID: interaction.guildId }, { addMsg: interaction.options.getString("mesaj") }, { upsert: true });
      interaction.reply({
        embeds: [{
          title: "Hoşgeldin Mesajı Başarıyla ayarlandı",
          description: `Hoşgeldin mesajınız;
      \`${interaction.options.getString("mesaj")}\`\n
      **örnek:**\n${mesaj}`,
        }]
      });
    }
    else {
      await model.updateOne({ GuildID: interaction.guildId }, { addMsg: null }, { upsert: true });
    }
  }
};