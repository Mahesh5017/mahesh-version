const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.send('Welcome to the WebSocket server!');

    const cleanDeviceList = device.map(dev => ({
        deviceid: dev.deviceid,
        status: dev.status
    }));

    const deviceListMessage = JSON.stringify({ type: 'DEVICE_LIST', devices: cleanDeviceList });
    ws.send(deviceListMessage);

    ws.on('message', (message) => {
        console.log(`Received message from client: ${message}`);
        if (parsedMessage.type === 'DEVICE_CONTROL') {
            console.log('Broadcasting TURN_ON message to all clients');
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({type:'DEVICE_CONTROL',deviceid:parsedMessage.deviceid}));
                }
            });
        } 
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
