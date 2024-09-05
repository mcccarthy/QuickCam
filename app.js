const express = require('express');
const http = require('http');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html'); // Use res.sendFile for correct file serving
});

let connectedPeers = [];

io.on('connection', socket => {
	connectedPeers.push(socket.id);
	console.log(`User connected: ${socket.id}`);

	socket.on('disconnect', () => {
		console.log(`User disconnected: ${socket.id}`);
		connectedPeers = connectedPeers.filter(peerSocketId => peerSocketId !== socket.id);
	});
	console.log(connectedPeers);
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports = app;
