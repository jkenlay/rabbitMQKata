//worker file
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',function(err,conn){
    conn.createChannel(function(err,ch){
        var q = 'myQueue';

        ch.assertQueue(q,{durable:false});

        console.log('waiting for msgs');

        ch.consume(q,function(msg){
            console.log('received: ' + msg.content.toString());
        });
    });
});