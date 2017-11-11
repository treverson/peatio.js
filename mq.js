var ampq = require('amqp');

var connection = ampq.createConnection();

var bStop = false;

connection.on('ready', function () {
    connection.queue('moneyQueue', { durable: true, autoDelete: false }, function (queue) {
        console.log('Queue ' + queue.name + ' is open!');
        queue.subscribe(function (message, header, deliveryInfo) {
            if (message.data) {
                var messageText = message.data.toString()
                console.log(messageText);
                if (messageText === "quit") bStop = true;
            }
        });
    });
});


(function keepItRunning() {
    if (!bStop)
        setTimeout(keepItRunning, 1000);
    else
        connection.end();
})();