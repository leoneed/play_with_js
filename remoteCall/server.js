'use strict'

var wrap = new (require('./remoteCall.js').server);

wrap(function CallMe (a, b, c) {
    return a + b + c;
});


wrap(function CallMeToo (a, b) {
    console.log('CallMeToo called');
    console.log(arguments);
    return a + ' ### ' + b ;
});