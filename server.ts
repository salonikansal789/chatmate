import {connect} from 'mongoose';

const dbConfig = {
  url: process.env.MONGODB_URI 
};


export default function connectDB() {
    connect(dbConfig.url!)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.error("MongoDB connection error:", err));
}