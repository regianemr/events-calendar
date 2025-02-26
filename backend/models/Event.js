import mongoose from "mongoose";
const Schema = mongoose.Schema

const EventSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    },
    type: {
      type: String,
      required: false
    },
    color: {
      type: String,
      required: false
    }
  ,
  },
  {timestamps: true}
);

export default mongoose.model("Event", EventSchema)



