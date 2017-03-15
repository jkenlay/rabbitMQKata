//worker

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',function(err,conn){
    conn.createChannel(function(err,ch){
        var q = 'myQueue';

        ch.assertQueue(q,{durable:false});

        ch.consume(q,function(msg){
            console.log('msg received from server: ' + msg.content.toString());
        });
    });
});