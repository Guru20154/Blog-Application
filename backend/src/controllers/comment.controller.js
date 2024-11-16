import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Comment } from "../models/comments.model.js";

const addComment = asyncHandler(async (req, res) => {
    const { blogId, comment } = req.body;

    if (!blogId || !req.user || !comment) {
        throw new ApiError(400, "All fields are required, or login is required");
    }

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
        throw new ApiError(400, "Invalid blogId format");
    }

    const { username } = req.user;

    
    const updatedComment = await Comment.findOneAndUpdate(
        { blogId: new mongoose.Types.ObjectId(blogId) }, 
        { $push: { comments: { username, comment } } }, 
        { new: true, upsert: true } 
    );

    // Respond with updated comment
    return res
        .status(200)
        .json(new ApiResponse(200, updatedComment, "Comment added successfully"));
});

const getComments = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    
    const comments = await Comment.findOne({ blogId: id }).select("comments").lean();
   
    if (!comments) {
        return res.status(404).json({ message: "No comments found for this blog" });
    }

   
    res.status(200).json({ comments: comments.comments });
});

export {
    addComment,
    getComments
}