import mongoose from "mongoose"

async function connectDB() {
    try {
       await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
       console.log("Connected To DB ✅")
    } catch (error) {
        console.log("Not Connected To DB ❌")
    }
}

export default connectDB;