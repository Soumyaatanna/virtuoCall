import { Server } from 'socket.io';

let connections = {};
let messages = {};
let timeOnline = {};

export const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders:["*"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        socket.on('join-call', (path) => {
            if (!connections[path]) connections[path] = [];
            if (!messages[path]) messages[path] = [];

            connections[path].push(socket.id);
            timeOnline[socket.id] = new Date();

            // Send existing messages to new user
            messages[path].forEach((msg) => {
                socket.emit("chat", msg.data, msg.sender, msg["socket-id-sender"]);
            });
        });

        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        });

        socket.on("chat", (data, sender) => {
            const [room, found] = Object.entries(connections).find(([_, ids]) => ids.includes(socket.id)) || [null, false];
            if (!room) return;

            if (!messages[room]) messages[room] = [];
            messages[room].push({ data, sender, 'socket-id-sender': socket.id });

            connections[room].forEach((id) => {
                io.to(id).emit("chat", data, sender, socket.id);
            });

            console.log("message from", sender, ":", data);
        });

        socket.on('disconnect', () => {
            const joinedAt = timeOnline[socket.id];
            const leftAt = new Date();
            const duration = joinedAt ? Math.abs(leftAt - joinedAt) : 0;

            delete timeOnline[socket.id];

            for (const [room, users] of Object.entries(connections)) {
                if (users.includes(socket.id)) {
                    // Inform others in the room
                    users.forEach((id) => {
                        io.to(id).emit("user-disconnected", socket.id);
                    });

                    // Remove the user
                    connections[room] = users.filter(id => id !== socket.id);

                    // Clean up if empty
                    if (connections[room].length === 0) {
                        delete connections[room];
                        delete messages[room];
                    }

                    break; // Exit loop once handled
                }
            }

            console.log(`Socket disconnected: ${socket.id} (online for ${duration / 1000}s)`);
        });
    });

    return io;
};
