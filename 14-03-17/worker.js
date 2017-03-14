//worker

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',function(err,conn){
    conn.createChannel(function(err,ch){
        var q = 'myQueue';

        ch.assertQueue(q,{durable:false});
        console.log('Waiting for messages in Queue');
        ch.consume(q,function(msg){
            console.log('Recieved msg: ' + msg.content.toString());
        },{noAck:true});
    });
});