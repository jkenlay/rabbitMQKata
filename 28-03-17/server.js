var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',function(err,conn){
    conn.createChannel(function(err,ch){
        var q = 'myQueue';

        var msg = process.argv.slice(2).join('.') || 'hello world...';

        ch.assertQueue(q,{durable:true});

        ch.sendToQueue(q,new Buffer(msg),{persistant:true});

        console.log('sent msg');


    });
    setTimeout(function() {
        console.log('closing');
        conn.close();
        process.exit(0);
    }, 5000);
});