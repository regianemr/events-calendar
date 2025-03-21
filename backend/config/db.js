import mongoose from 'mongoose';

// Credentials
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

export async function connectToDB(){
  try {
    const conn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@eventscalendar.uqtwd.mongodb.net/eventscalendar?retryWrites=true&w=majority&appName=EventsCalendar`);
    console.log("Conectou ao banco!");
  } catch(err) {
    console.log(err)
  } 
}
export default connectToDB