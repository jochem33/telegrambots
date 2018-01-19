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
  ansid = "HOEGAAT";
  answer = "Hallo " + msg.from.first_name + ", hoe gaat het?";
});

bot.on(/[Gg]oed|[Pp]rima|[Zz]\'?n gang|[Zz]\'?n gangetje/, function (msg) {
  if(ansid == "HOEGAAT")
    ansid = "MIJOOKGOED";
    answer = "fijn, met mij gaat het ook goed.";
  } else if(ansid = "MIJOOKGOED") {
    answer = "top";
  } else {
    answer = "Wat is er goed?";
  }
});

bot.on(/[Ss]lecht!?|[Mm]atig|[Nn]iet z?o? ?goed!?|[Kk]an beter|[Hh]et had beter gekund!?/, function (msg) {
  if(ansid == "HOEGAAT") {
    ansid = "SLECHTJAMMER";
    answer = "Dat is jammer.";
  } else {
    answer = "hmmmm";
  }
});

bot.on(/[Jj]a!?|[Ii][Dd][Dd]!?|[Ii]nderdaad!?/, function (msg) {
  if(ansid == "SLECHTJAMMER") {
    answer = "ok";
  } else {
    answer = "hmmmm";
  }
});

bot.on(/(in bed)$/, function (msg) {
  ansid = "INBED";
  answer = "pret";
});

bot.on(/\/wiebenje|[Ww]ie ben je\??|[Ww]at ben je\??/, function (msg) {
  ansid = "WIE";
  answer = "Hoi, ik ben een telegram bot met de naam Jochembot!";
});

bot.on(/\/foto|[Kk]an je m[ei]j? een foto sturen\??|[Kk]an je m[ei]j? een foto geven\??|[Gg]eef mij een foto\??|[Ss]tuur mij een foto!?/, function (msg) {
  return bot.sendPhoto(msg.from.id, "images/splash.jpg");
});

bot.on('/versie', function (msg) {
  answer = "Ik ben momenteel op versie 2.0";
});

bot.on(/^([hH][oai]+i|[Hh]allo!*|[Gg]oe[id]emorgen!*|[Hh]i+)/, function (msg) {
  var hoi = ["Hoi", "Hallo", "Goedendag", goedemorgen, "Hoi " + msg.from.first_name, "Hallo " + msg.from.first_name, "Goedendag " + msg.from.first_name, goedemorgen + " " + msg.from.first_name]
  answer = hoi[random(8)];
});

bot.on(/^[Dd]oei/, function (msg) {
  answer = "Doei " + msg.from.first_name;
});

bot.on(/^([Hh]oe.*\?+|[Ww]a+rom.*\?+)/, function (msg, props) {
  var ans = ["Ik weet het niet", "Ik begrijp de vraag niet zo goed", "??", "Ik heb geen idee"]
  answer = ans[random(4)];
});

bot.on(/[Hh]oe is het\??|[Hh][Gg][Hh]\??|[Hh]oe gaat het\?? ?e?r? ?m?e?e?\??|[Aa]lles goed\??/, function (msg) {
  var hoi = ["Goed", "Prima", "Normaal", "Z'n gangetje", "Goed, en met jou?", "Prima, en met jou?", "Z'n gengetje, en jij?"]
  answer = hoi[random(8)];
});

bot.on(/\/tijd|[Hh]oe ?laat is het ?n?u?[\?]?/, function (msg) {
  uren = date.getHours();
  if (uren > 12) {
    uren -= 12;
  }
  answer = "Het is nu " + date.getMinutes() + " over " + uren;
});

bot.on(/[Ii]k ben ([0-9][0-9])/, function (msg, props) {
  var leeftijd = props.match[1];
  var ans = ["Ok", "cool", "Oké, ik ben nog niet zo oud."];
  senddata(msg.from.first_name, leeftijd[7] + leeftijd[8])
  answer = ans[random(3)];
});

bot.on(/[Hh]oe oud ben ik\??/, function (msg) {
  var naam = msg.from.first_name;
  getdata(naam);
  //leeftijd = getdata(msg.from.first_name);
  setTimeout(function(){
    console.log("in regex leeftijd is: " + leeftijd);
    answer = "je bent " + leeftijd + " jaar oud.";
  }, 200);
});

bot.on(/(.+)/, function (msg, props) {
  lastansid = ansid;
  lastlastmsg = lastmsg;
  lastmsg = props.match[1];
  setTimeout(function(){
    console.log(msg.from.first_name + " " + msg.from.last_name + ": " + lastmsg);
    console.log("Bot: " + answer)
    return bot.sendMessage(msg.from.id, answer);
  }, 300);
});



function sendconversation(name, bot, user) {
  mongo.connect(url, function(err, db) {
    db.db("test").collection('conversations').insertOne({
      "name": name,
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
