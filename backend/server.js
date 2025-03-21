import app from "./app";
import { connectToDB } from './config/db.js';

const PORT = process.env.PORT || "5000"
connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port", PORT)
  })
})