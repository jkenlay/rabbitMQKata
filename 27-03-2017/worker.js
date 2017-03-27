var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',function(err,conn){
    conn.createChannel(function(err,ch){

        var q = 'MyQueue';

        ch.assertQueue(q,{durable:true});
        ch.prefetch(1);

        console.log('waiting for messages');

        ch.consume(q,function(msg){
            var secs = msg.content.toString().split('.').length -1;

            console.log('received: ' + msg.content.toString());

            setTimeout(function() {
                console.log('done');
                ch.ack(msg);
            }, secs * 1000);
        });
    });
});