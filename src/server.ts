import {connect} from 'mongoose';

const dbConfig = {
    url: process.env.DB_URL || 'mongodb://localhost:27017/mydatabase',
}


export default function connectDB() {
    connect(dbConfig.url)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.error("MongoDB connection error:", err));
}