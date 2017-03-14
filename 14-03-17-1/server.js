//server
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',function(err,conn){
    conn.createChannel(function(err,ch){
        var q = 'myQueue';

        ch.assertQueue(q,{durable:false});

        //sending
        var msg = 'hello from this server';
        ch.sendToQueue(q,new Buffer(msg));

    });
    setTimeout(function() {
        conn.close();
        process.exit(0);
    }, 1000);
});