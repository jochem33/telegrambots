var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost/test';

const TeleBot = require('telebot');

const bot = new TeleBot('508978429:AAHcNczEHomrFMLKGmF23WpDbfwy1WBQQs4');

var answer2 = "Hallo, welkom bij galgje";
var answer = "Raad een letter!";
var lastlastmsg;
var ansid;
var lastansid;

var leeftijd;

woordenlijst = ["ijs", "pizza", "telegram"];

var woord = woordenlijst[random(3)];
var geradenletter;
var moetnograden;
var geradendezebeurt;
var geradenletters = [];
var foutgeradenletters = [];
var foutgeraden = 0;
var aantalletters = woord.length;
for (i = 0; i < aantalletters; i++) {
  geradenletters.push("_");
}

function voortgang() {
  if (foutgeraden == 0){
    answer2 = "________";
  }
  if (foutgeraden == 1){
    answer2 = "  |\n |\n |\n |\n |\n |\n________";
  }
  if (foutgeraden == 2){
    answer2 = "________\n |/\n |\n |\n |\n |\n |\n________";
  }
  if (foutgeraden == 3){
    answer2 = "________" +
            "\n |/" +
            "\n |" +
            "\n |" +
            "\n |" +
            "\n |" +
            "\n |" +
            "\n________";
  }
  if (foutgeraden == 4){
    answer2 = "________" +
            "\n |/     |" +
            "\n |     ( )" +
            "\n |" +
            "\n |" +
            "\n |" +
            "\n |" +
            "\n________";
  }
  if (foutgeraden == 5){
    answer2 = "________" +
            "\n |/     |" +
            "\n |     ( )" +
            "\n |     /|\\" +
            "\n |     / \\" +
            "\n |" +
            "\n |" +
            "\n________";
  }
  answer2 = answer2 + "\n" + foutgeradenletters + "\n" + geradenletters;
  return(answer2);
}

bot.on('/start', function (msg) {
  woord = woordenlijst[random(3)];
  geradenletter = 0;
  geradendezebeurt;
  geradenletters = [];
  foutgeradenletters = [];
  foutgeraden = 0;
  aantalletters = woord.length;
  for (i = 0; i < aantalletters; i++) {
    geradenletters.push("_");
  }

  answer = "Raad een letter!";
  answer2 = "Hallo " + msg.from.first_name + ", welkom bij galgje";
});


bot.on(/^[a-z]$/, function (msg, props) {
  geradendezebeurt = 0;
  geradenletter = props.match[1];
  console.log("letter geraden")
  for (i = 0; i < aantalletters; i++) {
    if (geradenletter == woord[i]) {
      geradenletters[i] = geradenletter;
      answer = "Goedzo, je hebt een letter geraden!";
      geradendezebeurt++;
    }
  }
  if (geradendezebeurt == 0) {
    foutgeradenletters.push(geradenletter);
    foutgeraden++;
    answer = "Jammer, probeer het nog een keer";
  }
  moetnograden = geradenletters.indexOf("_");
  if (moetnograden == -1) {
    answer = "Gefeliciteerd, je hebt het woord geraden, het was inderdaad " + woord;
    answer2 = "";
  }
  voortgang();
});

bot.on(/[A-Z0-9]/, function (msg, props) {
  answer = "Je kan geen getallen en alleen kleine letters raden."
});

bot.on(/(.+)/, function (msg, props) {
  lastmsg = props.match[1];
  setTimeout(function(){
    console.log(msg.from.first_name + " " + msg.from.last_name + ": " + lastmsg);
    console.log("Bot: " + answer)
    return bot.sendMessage(msg.from.id, answer);
  }, 300);
  //sendconversation(msg.from.first_name + " " + msg.from.last_name, msg.from.id, answer, lastmsg);
});

bot.on(/(.+)/, function (msg, props) {
  return bot.sendMessage(msg.from.id, answer2)
});

function random(aantal) {
  return Math.floor(Math.random() * aantal);
}


bot.start();
