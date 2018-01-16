var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost/test';

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
  var ans = ["Ik weet het niet", "Ik begrijp de vraag niet zo goed", "??", "Ik heb geen idee"]
  return bot.sendMessage(msg.from.id, ans[random(6)]);
});

bot.on(/ik ben ([0-9][0-9])/, function (msg, props) {
  var leeftijd = props.match[1];
  console.log(props.match)
  var ans = ["Cool", "Ik ben 3 maanden oud!", "Ok"]
  senddata(msg.from.first_name, leeftijd)
  return bot.sendMessage(msg.from.id, ans[random(3)]);
});

bot.on(/[Hh]oe oud ben ik\??/, function (msg) {
  var naam = toString(msg.from.first_name);
  return bot.sendMessage(msg.from.id, "je bent " + getdata(naam) + " jaar oud.");
});

bot.on(/(.+)/, function (msg, props) {
  lastmsg = props.match[1];
  console.log(msg.from.first_name + " " + msg.from.last_name + ": " + lastmsg);
});



function random(aantal) {
  return Math.floor(Math.random() * aantal);
}

function getdata(naam) {
  mongo.connect(url, function(err, db) {
    db.db("test").collection('users').findOne({ "name" : naam}, function (err, result) {
      var bericht;
      if (err) throw (err);
      db.close();
      if (!result) {
        bericht = "Dat heb je me nog niet verteld"
      } else {
        bericht = result.name + " " + result.score
      }
      return bericht;
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
