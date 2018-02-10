var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost/test';

const TeleBot = require('telebot');

const bot = new TeleBot('508978429:AAHcNczEHomrFMLKGmF23WpDbfwy1WBQQs4');

var answer;
var lastmsg;
var lastlastmsg;
var ansid;
var lastansid;

var leeftijd;

woordenlijst = ["ijs", "pizza", "telegram"];

woord = woordenlijst[random(3)];
geradenletters = [];
foutgeradenletters= [];
aantalletters = woord.lenght;
for (i = 0; i < aantalletters; i++) {
  geradenletters.push("_");
}

bot.on('/start', function (msg) {
  answer = "Raad een letter!";
  return bot.sendMessage(msg.from.id, "Hallo " + msg.from.first_name + " welkom bij galgje");
});

bot.on(/^([a-zA-Z])$/), function (msg, props) {
  geradenletter = props.match(1);
  var woordinletter = woord.indexOf(geradenletter);
  if(woordinletter != -1){
    geradenletters[woordinletter] = geradenletter;
    answer = "goedzo, je hebt een letter geraden!";
  } else {
    answer = "jammer, probeer het nog een keer";
  }
}

bot.on(/(.+)/, function (msg, props) {
  lastansid = ansid;
  lastlastmsg = lastmsg;
  lastmsg = props.match[1];
  setTimeout(function(){
    console.log(msg.from.first_name + " " + msg.from.last_name + ": " + lastmsg);
    console.log("Bot: " + answer)
    return bot.sendMessage(msg.from.id, answer);
  }, 300);
  //sendconversation(msg.from.first_name + " " + msg.from.last_name, msg.from.id, answer, lastmsg);
});



function sendconversation(name, id, bot, user) {
  mongo.connect(url, function(err, db) {
    db.db("test").collection('conversations').insertOne({
      "name": name,
      "id": id,
      "bot": bot,
      "user": user
    });
    db.close();
  });
}

function random(aantal) {
  return Math.floor(Math.random() * aantal);
}

function getdata(naam) {
  mongo.connect(url, function(err, db) {
    db.db("test").collection('users').findOne({ "name" : naam}, function (err, result) {
      if (err) throw (err);
      db.close();
      if (!result) {
        leeftijd = 0;
        console.log("[database] user " + naam + " not found!")
        return 0;
      } else {
        leeftijd = result.leeftijd;
        console.log("[database] found: " + naam + ", " + leeftijd);
        console.log(leeftijd + " otto")
        return result.leeftijd;
      }
    });
  });
}

function senddata(naam, hoeoud) {
  mongo.connect(url, function(err, db) {
    db.db("test").collection('users').insertOne({
      "name": naam,
      "leeftijd": hoeoud
    });
    db.close();
  });
  console.log("[database] added: " + naam + ", " + hoeoud)
}

bot.start();
