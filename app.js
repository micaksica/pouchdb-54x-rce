var express = require('express'),
    app     = express(),
    PouchDB = require('pouchdb');

app.use('/db', require('express-pouchdb')(PouchDB));
app.listen(3000);

var testDatabase = new PouchDB('test');

console.log("Listening using express-pouchdb on port 3000.");
console.log("\n\nNow, listen on netcat. nc -l 8080");
console.log("Once you're listening, run exploit.py to send a shell to that nc instance.");
