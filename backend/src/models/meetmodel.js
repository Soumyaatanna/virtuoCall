import { Schema } from "mongoose";
import mongoose from "mongoose";
const meetSchema = new Schema(
    {
        user_id : {
            type: String
        },
        meet_code: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now,
            required: true
        }
    }
)
const Meeting = mongoose.model("Meet", meetSchema);
export { Meeting };