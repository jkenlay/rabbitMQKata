var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',function(err,conn){
    conn.createChannel(function(err,ch){
        var q = 'myQueue';

        ch.assertQueue(q,{durable:true});

        ch.prefetch(1);

        ch.consume(q,function(msg){
            var secs = msg.content.toString().split('.').length -1;

            console.log('received msg: ' + msg.content.toString());

            setTimeout(function() {
                console.log('done, ackknowledging');
                ch.ack(msg);
            }, 1000*secs);
        });
    });
});