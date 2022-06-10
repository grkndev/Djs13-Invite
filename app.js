const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { Client, Collection, MessageEmbed } = require('discord.js');
const client = new Client({ intents: 851 });
const fs = require("fs");

const invite = require('invite-module');
invite.inviteCounter(client);

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://videobot:videobot@cluster0.x24lr.mongodb.net/videomongosu?retryWrites=true&w=majority")
  .then(() => console.log("Connect MongoDb"))
  .catch(console.error);

global.client = client;
client.commands = (global.commands = []);
//#region KOMUTLAR LOAD
fs.readdir("./komutlar/", (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./komutlar/${file}`);
    client.commands.push({
      name: props.name.toLowerCase(),
      description: props.description,
      options: props.options,
      type: 1
    })
    console.log(`👌 Slash Komut Yüklendi: ${props.name}`);
  });
});
//#endregion
//#region EVENTS LOAD
fs.readdir("./events/", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`👌 Event yüklendi: ${eventName}`);
    client.on(eventName, (...args) => {
      event(client, ...args);
    });
  });
});
//#endregion
//#region KOMUTLAR SET
client.on("ready", async () => {
  console.log("Ready!");
  client.user.setActivity("RabeL", { type: "WATCHING" });
  const rest = new REST({ version: "10" }).setToken("");
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: commands,
    })
  } catch (error) {
    console.error(error);
  }
});
//#endregion

client.login("");
const model = require("./models/guilds");
const memberData = require("./models/member");

client.on("memberJoin", async (member, invite, inviter, guild) => {
  const kurulus = new Date().getTime() - member.createdAt;
  if (kurulus < 1296000000) await memberData.updateOne({ GuildID: guild.id, MemberId: inviter.id }, { $inc: { fake: 1 } });
  const { uses = 0, bonus = 0, fake = 0, ayrılan = 0 } = await memberData.findOneAndUpdate({ GuildID: guild.id, MemberId: inviter.id }, { $inc: { uses: 1 } }, { upsert: true }) || { uses: 0 };
  const { addChannel, addMsg, ranks } = await model.findOne({ GuildID: guild.id }) || { addChannel: "", addMsg: "", ranks: [] };
  if (addChannel == "" || addMsg == "") return;
  let toplam = uses + bonus + 1 - fake - ayrılan;
  ranks.forEach(async (rank) => {

    if (toplam >= rank.miktar && !guild.members.cache.get(inviter.id).roles.cache.has(rank.rol)) {
      await guild.members.cache.get(inviter.id).roles.add(rank.rol);
    }
  })
  let mesaj = addMsg
    .replace("{kullanıcı.tag}", member.user.tag)
    .replace("{kullanıcı.username}", member.user.username)
    .replace("{kullanıcı}", member)
    .replace("{davetEden.tag}", inviter.tag)
    .replace("{davetEden.username}", inviter.username)
    .replace("{davetEden}", inviter)
    .replace("{sunucu-adı}", guild.name)
    .replace("{sunucu-toplamÜye}", guild.memberCount)
    .replace("{davet-kodu}", invite.code)
    .replace("{kullanım}", toplam);

  guild.channels.cache.get(addChannel).send({ content: `${mesaj}` });
})

client.on("memberLeave", async (member, invite, inviter, guild) => {
  const kurulus = new Date().getTime() - member.createdAt;
  if (kurulus < 1296000000) await memberData.updateOne({ GuildID: guild.id, MemberId: inviter.id }, { $inc: { fake: -1 } });
  const { uses = 0, bonus = 0, fake = 0, ayrılan = 0 } = await memberData.findOneAndUpdate({ GuildID: guild.id, MemberId: inviter.id }, { $inc: { ayrılan: 1 } }, { upsert: true }) || { uses: 0 };
  const { rmvChannel, rmvMsg,ranks } = await model.findOne({ GuildID: guild.id }) || { rmvChannel: "", rmvMsg: "" };
  if (rmvChannel == "" || rmvMsg == "") return;
  let toplam = uses + bonus - 1 - fake - ayrılan;
  ranks.forEach(async (rank) => {

    if (toplam < rank.miktar && guild.members.cache.get(inviter.id).roles.cache.has(rank.rol)) {
      await guild.members.cache.get(inviter.id).roles.remove(rank.rol);
    }
  })
  let mesaj = rmvMsg
    .replace("{kullanıcı.tag}", member.user.tag)
    .replace("{kullanıcıser.username}", member.user.username)
    .replace("{kullanıcı}", member)
    .replace("{davetEden.tag}", inviter.tag)
    .replace("{davetEden.username}", inviter.username)
    .replace("{davetEden}", inviter)
    .replace("{sunucu-adı}", guild.name)
    .replace("{sunucu-toplamÜye}", guild.memberCount)
    .replace("{davet-kodu}", invite.code)
    .replace("{kullanım}", toplam);

  guild.channels.cache.get(rmvChannel).send({ content: `${mesaj}` });
})