var Spooky = require('spooky');

module.exports = function (email, creditential, callback) {
    var log = '';
    var spooky = new Spooky({
        child: {
            transport: 'http',
            'ssl-protocol': 'any',
            'ignore-ssl-errors': true
        },
        casper: {
            logLevel: 'debug',
            verbose: true,
            sslProtocol: 'any'
        }
    }, function (err) {

        if (err) {
            e = new Error('Failed to initialize SpookyJS');
            e.details = err;
            throw e;
        }

        spooky.start();
        spooky.thenOpen('https://red.sfr.fr/parrainage/action.html');

        spooky.then([{email: email, creditential: creditential}, function () {
            window.email = email;
            window.creditential = creditential;
        }]);

        spooky.waitForSelector("#loginForm", function() {
            this.emit('msg', "Page de connection");
            this.fillSelectors('#loginForm', {
                'input[name = username ]' : window.creditential.login,
                'input[name = password ]' : window.creditential.pass
            }, true);
        });

        spooky.waitForSelector("#form", function() {
            this.emit('msg', "Page de parrainage pour le mail " + window.email);
            this.fillSelectors('#form', {
            '#email1' : window.email
            }, true);
        });

        spooky.waitWhileSelector("#form", function() {
            this.emit('msg', "Parrainage effectué");
            this.emit('ended');
        });

        spooky.run();
    });

    spooky.on('error', function (e, stack) {
        console.error(e);
        if (stack) {
            console.log(stack);
        }
        log += e + "\n";
        if (stack) log += stack + "\n";
        log += "** ERROR **" + "\n";
        callback('error', log)
    });

    spooky.on('msg', function (greeting) {
        log += greeting + "\n";
        console.log(greeting);
    });

    spooky.on('ended', function () {
        log += "** SUCCESS **" + "\n";
        callback('success', log);
    });

    spooky.on('console', function (line) {
        log += line + "\n";
        console.log(line);
    });

    /*
        // Uncomment this block to see all of the things Casper has to say.
        // There are a lot.
        // He has opinions.
        spooky.on('console', function (line) {
            console.log(line);
        });
    */
};