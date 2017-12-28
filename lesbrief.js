
const TeleBot = require('telebot');

const bot = new TeleBot('508978429:AAHcNczEHomrFMLKGmF23WpDbfwy1WBQQs4');

var lastmsg;

var date = new Date();
var uur = date.getHours();
var goedemorgen = "goedendag";
if (uur < 13 || uur > 4) {
  goedemorgen = "goeiemorgen";
} else if (uur > 12 && uur < 17) {
  goedemorgen = "goeiemiddag";
} else if (uur > 16 || uur < 5) {
  goedemorgen = "goeienavond";
}

bot.on('/start', function (msg) {
  return bot.sendMessage(msg.from.id, "Hallo " + msg.from.first_name);
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

bot.on(/\/tijd|[Hh]oe laat is het ?n?u?[\?]?/, function (msg) {
  uren = date.getHours();
  if (uren > 12) {
    uren -= 12;
  }
  return bot.sendMessage(msg.from.id, "Het is nu " + date.getMinutes() + " over " + uren);
});

bot.on(/^([hH][oai]+i|[Hh]allo!*|[Gg]oe[id]emorgen!*|[Hh]i+)/, function (msg) {
  var hoi = ["Hoi", "Hallo", "Goedendag", goedemorgen, "Hoi " + msg.from.first_name, "Hallo " + msg.from.first_name, "Goedendag " + msg.from.first_name, goedemorgen  + msg.from.first_name]
  return bot.sendMessage(msg.from.id, hoi[random(8)]);
});

bot.on(/^[Dd]oei/, function (msg) {
  return bot.sendMessage(msg.from.id, "Doei " + msg.from.first_name);
});

bot.on(/^([Hh]oe.*\?+|[Ww]a+rom.*\?+)/, function (msg) {
  var ans = ["Ik weet het niet", "Ik begrijp de vraag niet zo goed", "??", msg.from.first_name + " je moet echt wat duidelijker zijn", "Ik heb geen idee"]
  return bot.sendMessage(msg.from.id, ans[random(6)]);
});

bot.on(/(.+)/, function (msg, props) {
  lastmsg = props.match[1];
  console.log(msg.from.first_name + " " + msg.from.last_name + ": " + lastmsg);
});



function random(aantal) {
  return Math.floor(Math.random() * aantal);
}

bot.start();
