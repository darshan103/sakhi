import mongoose from "mongoose";

const connectDB = async() => {
    try{
        const connect = await mongoose.connect(process.env.mongo_url);
        console.log(`Connected to mongoDB database ${connect.connection.host}`.bgMagenta.white);
    }catch(error){
        console.log(`Error in mongoose ${error}`.bgRed.white)
    }
}

export default connectDB;