//server .js

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',function(err,conn){
    conn.createChannel(function(err,ch){

        var q = 'myQueue';

        ch.assertQueue(q,{durable:false});

        var msg = 'hello from server.js';

        ch.sendToQueue(q,new Buffer(msg));

    });
    setTimeout(function() {
        conn.close();
        process.exit(0);
    }, 1000);
});