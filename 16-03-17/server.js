//server

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',function(err,conn){
    conn.createChannel(function(err,ch){
        var q = 'myQueue';

        //since were a server we need to create a msg to send:
        var msg = 'hello from server on the 16th march!';

        //assert the quee exists
        ch.assertQueue(q,{durable:false});

        //send to the queue, via a newbuffer
        ch.sendToQueue(q,new Buffer(msg));
    });
    setTimeout(function(){
        conn.close();
        process.exit(0);
    },5000);
});