'use strict'

const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on('connection', function connection(webSocket) {
    webSocket.on('message', function incoming(data) {

        // broadcast
        webSocketServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data.toString());
            }
        });

    });
});

server.listen(9494);