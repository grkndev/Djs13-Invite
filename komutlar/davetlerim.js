const { Client, CommandInteraction } = require("discord.js");
const model = require("../models/member")
module.exports = {

  name: "davetlerim",
  description: 'Belirtilen kullanıcının sunucdaki davet bilgisini gösterir',
  type: 1,
  options: [
    {
      name: "kullanıcı",
      description: "Davet eklenicek kullanıcı",
      type: 6,
      required: false,
    }
  ],
  /**
  * @param {Client} client
  * @param {CommandInteraction} interaction
  */
  run: async (client, interaction) => {
    if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return interaction.reply({embeds:[{description: "Bu komutu kullanabilmek için `Sunucuyu Yönetici` yetkisine sahip olmalısınız."}]})
    let kullanıcı = interaction.options.getMember("kullanıcı") || interaction.member;

    let { uses = 0, fake = 0, bonus = 0, ayrılan = 0 } = await model.findOne({ GuildID: interaction.guildId, MemberId: kullanıcı.id }) || { uses: 0, fake: 0, bonus: 0 };
    interaction.reply({
      embeds: [{
        author: { name: `${kullanıcı.user.tag} adlı kişinin davet bilgileri` },
        description: `✅ **${uses}** Kişi katıldı
      **❌ ${ayrılan}** Kişi ayrıldı
      **💩 ${fake}** sahte davet
      **✨ ${bonus}** bonus

      Toplam **${uses + bonus - ayrılan - fake}** davetin var! 👏
      
      Sunucuya katılma tarihi: <t:${parseInt(kullanıcı.joinedAt / 1000)}:R>`,
        color: "#2F3136",
        timestamp: new Date(),
        thumbnail: { url: kullanıcı.user.avatarURL({ dynamic: true, size: 1024 }), height: 1024, width: 1024 },
        footer: { text: `${client.user.username} • ${interaction.member.user.tag} tarafından istendi`, iconURL: interaction.member.user.avatarURL({ dynamic: true }) }
      }]
      
    });
  }
};