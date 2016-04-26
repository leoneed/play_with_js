'use strict'

var wrap = new (require('./remoteCall.js').server);

wrap(function CallMe (a, b, c) {
    return a + b + c;
});


wrap(function CallMeToo (a, b) {
    return a + ' ### ' + b ;
});