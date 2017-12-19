
const TeleBot = require('telebot');

const bot = new TeleBot('508978429:AAHcNczEHomrFMLKGmF23WpDbfwy1WBQQs4');

bot.on('/start', function (msg) {
  console.log(msg.from.first_name + " " + msg.from.last_name + " zei /start");
  return bot.sendMessage(msg.from.id, "Hallo " + msg.from.first_name);
});

bot.on('/wiebenje', function (msg) {
  console.log(msg.from.first_name + " " + msg.from.last_name + " zei /wiebenje");
  return bot.sendMessage(msg.from.id, "Hoi, ik ben Hakan", {replyToMessage: msg.message_id, notification: false});
});

bot.on('/foto', function (msg) {
  console.log(msg.from.first_name + " " + msg.from.last_name + " zei /foto");
  return bot.sendPhoto(msg.from.id, "images/splash.jpg");
});

bot.on('/versie', function (msg) {
  console.log(msg.from.first_name + " " + msg.from.last_name + " zei /versie");
  return bot.sendMessage(msg.from.id, "Ik ben momenteel op versie 1.0");
});

bot.on(/^([hH][oa]i|[Hh]allo!*)/, function (msg) {
  console.log(msg.from.first_name + " " + msg.from.last_name + " zei hoi");
  return bot.sendMessage(msg.from.id, "Hallo " + msg.from.first_name);
});

bot.on(/^[Dd]oei/, function (msg) {
  console.log(msg.from.first_name + " " + msg.from.last_name + " zei doei");
  return bot.sendMessage(msg.from.id, "Doei " + msg.from.first_name);
});

function random(aantal) {
  return Math.floor(Math.random() * aantal);
}

bot.start();
