import app from "./app.js";
import connectDB from "./db/db.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on Port : ${process.env.PORT} ✅`);
    });
  })
  .catch(() => {
    console.log("Error while connecting DB.")
  });
