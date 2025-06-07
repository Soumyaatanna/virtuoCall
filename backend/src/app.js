import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import userRoutes from './routes/users.routes.js';
import { connectToSocket } from './controllers/socketManager.js';
const app = express();
const server = createServer(app);
const io = connectToSocket(server);
app.set("port",(process.env.PORT || 8000));
app.use(cors());
app.use(express.urlencoded({limit: "40kb",extended:true}));
app.use(express.json({limit: "40kb"}));
app.use("/api/v1/users", userRoutes);
//app.use("/api/v2/users", newUserRoutes);
const start = async () => {
    app.set("mongo_user") 
    const connectionDb = await  mongoose.connect("Mongo")

    console.log(`mongodb connected successfully : ${connectionDb.connection.host}`);
    server.listen(app.get("port"), () => {
        console.log('Server is running on port 8000');
    });
}
start();
