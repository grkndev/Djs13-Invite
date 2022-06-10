const { Client, CommandInteraction } = require("discord.js");
const model = require("../models/guilds");
module.exports = {

    name: "ayrıldı-kanalı",
    description: 'Ayrıldın mesajının gideceği kanalı ayarlarsınız',
    type: 1,
    options: [
        {
            name: "ayarla",
            description: "Ayrıldı mesajının gideceği kanalı ayarlar",
            type: 1,
            options: [{ name: "kanal", description: "Ayrıldı mesajının gideceği kanal", type: 7, channel_types: [0], required: true }],
        },
        {
            name: "sıfırla",
            description: "Ayrıldı mesajının gideceği kanalı sıfırlar",
            type: 1,
            options: [],
        }
    ],
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    */
    run: async (client, interaction) => {
        if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return interaction.reply({embeds:[{description: "Bu komutu kullanabilmek için `Sunucuyu Yönetici` yetkisine sahip olmalısınız."}]})
        if (interaction.options.getSubcommand() == "ayarla") {
            await model.updateOne({ GuildID: interaction.guildId }, { rmvChannel: interaction.options.getChannel("kanal").id }, { upsert: true });
            interaction.reply({
                embeds: [{
                    title: "Ayrıldı Kanalı Başarıyla ayarlandı",
                    description: `Ayrıldı mesajının gideceği kanal ${interaction.options.getChannel("kanal")} olarka ayarlandı artık mesajlar oraya gidecek`,
                }]
            })
        }
        else {
            await model.updateOne({ GuildID: interaction.guildId }, { rmvChannel: null }, { upsert: true });
        }
    }
};