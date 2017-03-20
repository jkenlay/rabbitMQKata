var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',function(err,conn){
    conn.createChannel(function(err,ch){
        var q = 'myQueue';

        

        var msg = process.argv.slice(2).join(' ') || 'Hello World';

        ch.assertQueue(q,{durable:true});

        ch.sendToQueue(q,new Buffer(msg), {persistent:true});

        console.log('sent msg: ' + msg);

    });
    setTimeout(function(){
        console.log('closing:');
        conn.close();
        process.exit(0);
    },5000);
});

