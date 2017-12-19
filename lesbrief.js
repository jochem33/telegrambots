
const TeleBot = require('telebot');

const bot = new TeleBot('508978429:AAHcNczEHomrFMLKGmF23WpDbfwy1WBQQs4');

bot.on('/start', function (msg) {
  return bot.sendMessage(msg.from.id, "Hello world!");
});

bot.on('/wiebenje', function (msg) {
  return bot.sendMessage(msg.from.id, "Hoi, ik ben Hakan", {replyToMessage: msg.message_id, notification: false});
});

bot.on('/foto', function (msg) {
  return bot.sendPhoto(msg.from.id, "images/splash.jpg");
});

bot.on('/versie', function (msg) {
  return bot.sendMessage(msg.from.id, "Ik ben momenteel op versie 1.0");
});

bot.start();
