'use strict'

var fnCall = new (require('./remoteCall.js').client);

fnCall('CallMe')('test', 'hello', 5)(function(result) {
    console.log(result);
});

fnCall('CallMeToo')('hi', 11)(function(result) {
    console.log(result);
});