import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import itemRoutes from './routes/itemRoutes';
import folderRoutes from './routes/folderRoutes';
import filesystem from './routes/filesystem';
import Item from './models/Item';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const uri = 'mongodb://127.0.0.1:27017/adalinfiledb'; // Replace 'mydatabase' with your desired database name

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB locally!');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use('/api/filesystem', filesystem);


io.on('connection', (socket) => {
  console.log('Client connected socket', socket.id);

  socket.on('filesNfolderUpdated', (data) => {
    console.log('# received filesNfolderUpdated from', socket.id, data);
    io.emit('filesNfolderUpdate', data);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 


