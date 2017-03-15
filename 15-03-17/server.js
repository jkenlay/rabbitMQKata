//server

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',function(err,conn){
    conn.createChannel(function(err,ch){
        var q = 'myQueue';

        ch.assertQueue(q,{durable:false});

        var msg = 'hell ofrom the server';

        ch.sendToQueue(q,new Buffer(msg));


    });
    setInterval(function(){
        conn.close();
        process.exit(0);
    },5000);
});