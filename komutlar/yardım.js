const { Client, CommandInteraction } = require("discord.js");

module.exports = {

  name: "yardım",
  description: 'Botun Yardım Menüsü',
  type: 1,
  options: [],
  /**
  * @param {Client} client
  * @param {CommandInteraction} interaction
  */
  run: async (client, interaction) => {
    interaction.reply({
      embeds: [
        {
          title: `${client.user.username} Yardım Menüsü`,
          description: `Botu bu komutlarla yönetebilrisiniz.`,
          color:"GOLD",
          fields: [
            { name: "/ayrıldı-kanalı", value: "Ayrıldı mesajının gideceği kanalı ayarlarsınız", inline: true },
            { name: "/ayrıldı-mesaj", value: "Ayrıldı mesajının gideceği kanalı ayarlarsınız", inline: true },
            { name: "/hoşgeldin-kanalı", value: "Ayrıldı mesajının gideceği kanalı ayarlarsınız", inline: true },
            { name: "/hoşgeldin-mesaj", value: "Ayrıldı mesajının gideceği kanalı ayarlarsınız", inline: true },
            { name: "/rank-ekle", value: "Davet karşılığı verilecek rol ayarlarsınız", inline: true },
            { name: "/rank-sil", value: "Davet karşılığı verilen rolü silersiniz", inline: true },
            { name: "/ranklar", value: "Sunucuda Ayarlı bütün rankları gösterir", inline: true },
            { name: "/davet-ekle", value: "Belirtilen kişiye belirtilen miktarda davet ekler", inline: true },
            { name: "/davet-sil", value: "Belirtilen kişiden belirtilen miktarda daveti siler", inline: true },
            { name: "/davetlerim", value: "Davet bilgilerinizi gösterir", inline: true },
            {
              name: "Mesaj Ayarlarken kullanabilecğeiniz özellikler", value: `
        \`{kullanıcı.tag}\` ==> Kullanıcının tagı (${interaction.member.user.tag})
        \`{kullanıcı.username}\` ==> Kullanıcının Kullanıcı adı (${interaction.member.user.username})
        \`{kullanıcı}\` ==> Kullanıcının kendi kendisi (${interaction.member})
        \`{davetEden.tag}\` ==> Davet eden kişinin tagı (${client.user.tag})
        \`{davetEden.username}\` ==> Davet eden kişinin Kullanıcı adı (${client.user.username})
        \`{davetEden}\` ==> Davet eden kişinin kendi kendisi (${client.user})
        \`{sunucu-adı}\` ==> Sunucunun ismi (${interaction.guild.name})
        \`{sunucu-toplamÜye}\` ==> Sunucunun toplam kişi sayısı (${interaction.guild.memberCount})
        \`{davet-kodu}\` ==> Davet kodu (.gg/ dan sonra gelen kısım. rabel)
        \`{davet}\` ==> Davet linki (https://discord.gg/rabel)
        \`{kullanım}\` ==> Davet eden kişinin toplam davet sayısı (${Math.floor(Math.random() * 100)})
        `, inline: false
            }
          ]
        }
      ]
    })
  }
};