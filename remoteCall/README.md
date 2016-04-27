#Decorator for remote functions call

On server
```javascript
var RemoteCall = require('./remoteCall.js');
var wrap = RemoteCall.server(host, port); //localhost, 8080 by default
```

Wrap named function
```javascript
wrap(function FunctionName(a, b, c) {
    return a + b + c;
});
```

Client
```javascript
var RemoteCall = require('./remoteCall.js');
var caller = RemoteCall.client(host, port); //localhost, 8080 by default
```

Call function
```javascript
caller('FunctionName')(some, arguments, here)(callbackFunction);
//callback function will get return from called function as first argument
```

Callback is not required
```javascript
fnCall('CallMeToo')('hi', 11)();
```

Not necessary to make last call
```javascript
fnCall('CallMeToo')('hi', 11);
```

Call for arguments is not necessary too
```javascript
fnCall('CallMeToo');
```