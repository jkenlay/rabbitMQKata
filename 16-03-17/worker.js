//worker

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',function(err,conn){
    conn.createChannel(function(err,ch){
        var q = 'myQueue';

        //assert the queue  
        ch.assertQueue(q,{durable:false});

        //since we're a worker, we are waiting to recieve the message
        ch.consume(q,function(msg){
            console.log('msg recieved from server: ' + msg.content.toString());
        });
    });
});