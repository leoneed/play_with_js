var http = require('http');

const default_host = 'localhost';
const default_port = 8080;

var servers = {};
'use strict'

var clients = {};
var fnsToCall = {};

var listenServerHandler = function (callback) {
    return function(res) {
        var str = ''
        res.on('data', function (chunk) {
            str += chunk;
        });

        res.on('end', function () {
            if (res.statusCode === 200) {
                callback(str);
            }
            else if (res.statusCode === 404) {
                throw str;
            }
        });
    }
}

module.exports = {

    client: function(host, port) {
        host = host || default_host;
        port = port || default_port;

        if (!clients[host]) {
            clients[host] = {};
        }

        if (!clients[host][port]) {
            clients[host][port] = (function() {
                return function(nfName) {
                    return function() {
                        var data = Array.prototype.slice.call(arguments);
                        return function (callback) {
                            var req = http.request({
                                host: host,
                                port: port,
                                method: 'POST',
                                path: '/'+nfName
                            }, listenServerHandler(function(data) {
                                callback(JSON.parse(data));
                            }));

                            req.write(JSON.stringify(data));
                            req.end();
                        }
                    }
                }
            })();
        }

        return clients[host][port];
    },

    server: function(host, port) {
        host = host || default_host;
        port = port || default_port;

        if (!servers[host]) {
            servers[host] = {};
            fnsToCall[host] = {};
        }

        if (!servers[host][port]) {
            fnsToCall[host][port] = {};
            servers[host][port] = {
                wrapper: (function() {
                    var server = http.createServer(function(req, res) {
                        var fnName = req.url.replace('/','');
                        var body = "";

                        req.on('data', function (chunk) {
                            body += chunk;
                        });

                        req.on('end', function () {
                            if (fnsToCall[host][port][fnName]) {
                                res.writeHead(200);
                                res.end(
                                    JSON.stringify(
                                        fnsToCall[host][port][fnName].apply(null, 
                                            JSON.parse(body)
                                        )
                                    )
                                );
                            }
                            else {
                                res.writeHead(404);
                                res.end(JSON.stringify({ error: 1, message: 'function not found' }));
                            }
                            
                        });
                    });

                    server.listen(port, host, function() { console.log('Server started'); });

                    return function(fn) {
                        var fnName = fn.toString().substr('function '.length);
                        fnName = fnName.substr(0, fnName.indexOf('('));

                        if (fnName && !fnsToCall[host][port][fnName]) {
                            fnsToCall[host][port][fnName] = fn;
                        }
                    }
                })(),
                functions: {}
            };
        }

        return servers[host][port].wrapper;
    }
}