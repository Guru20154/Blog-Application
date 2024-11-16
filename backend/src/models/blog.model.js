import mongoose, {Schema} from "mongoose";

const blogSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: true,
        lowercase: true
    }],
    coverImage: {
        type: String,
        required: true,
    }
},{timestamps: true})

export const Blog = mongoose.model("Blog",blogSchema) 