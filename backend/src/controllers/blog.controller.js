import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Blog } from "../models/blog.model.js"
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const uploadBlogPost = asyncHandler(async (req, res) => {
    const { title, description, body, tags } = req.body
    if (!title && !description && !body) {
        throw new ApiError(400, "All fields are required")
    }
    // console.log(title, description, body, tags)
    const coverImageLocalPath = req.files?.coverImage ? req.files.coverImage[0]?.path : null;
    // console.log(coverImageLocalPath, req.files.coverImage[0]?.path)

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Upload Cover Image")
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!coverImage) {
        throw new ApiError(400, "CoverImage is required")
    }

    const blog = await Blog.create({
        owner: req.user?._id,
        title,
        description,
        body,
        tags,
        coverImage: coverImage.url,
    })

    const createdBlog = await Blog.findById(blog._id)

    if (!createdBlog) {
        throw new ApiError(500, "Someting went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdBlog, "Blog uplaoded successfully")
    )
})

const userBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.aggregate([
        {
            $match: {
                owner: req.user._id,
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerDetails",
            },
        },
        {
            $unwind: "$ownerDetails",
        },
        {
            $project: {
                _id: 1,
                title: 1,
                description: 1,
                body: 1,
                tags: 1,
                coverImage: 1,
                createdAt: 1,
                updatedAt: 1,
                "ownerDetails.username": 1,
                "ownerDetails.email": 1,
                "ownerDetails.avatar": 1,
            },
        },
    ]);

    // console.log(blogs)

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                blogs,
                "Blogs Fetched Successfully"
            )
        )
})

const blog = asyncHandler(async (req, res) => {
    const { page = 1, limit = 5 } = req.query; // Default values for pagination
    const skip = (page - 1) * limit;

    // Build the filter condition
    const filter = req.user && req.user._id ? { owner: { $ne: req.user._id } } : {};


    const blogs = await Blog.find(filter)
        .sort({ createdAt: -1 }) // Sort by most recent blogs
        .skip(parseInt(skip)) // Skip the number of documents based on the page
        .limit(parseInt(limit)); // Limit the number of results per page

    const totalBlogs = await Blog.countDocuments(filter);

    return res
        .status(200)
        .json({
            success: true,
            blogs,
            totalBlogs,
            totalPages: Math.ceil(totalBlogs / limit), // Calculate total pages
        });
})

const blogDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate('owner', 'username'); // Optionally populate the owner with the username

    if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    return res.
        status(200)
        .json({
            success: true,
            blog,
        });
})

const updateBlog = asyncHandler(async (req, res) => {
    const { title, description, body, tags } = req.body;
    if (!title && !description && !body) {
        throw new ApiError(400, "At least one of title, description, or body is required");
    }
    // console.log(req.body)
    const coverImageLocalPath = req.files?.coverImage ? req.files.coverImage[0]?.path : null;

    let coverImage = null;
    if (coverImageLocalPath) {
        // If a new cover image is uploaded, process it
        coverImage = await uploadOnCloudinary(coverImageLocalPath);

        if (!coverImage) {
            throw new ApiError(400, "Cover image upload failed");
        }
    }

    const { id } = req.params;

    // Prepare update object
    const updateData = {
        ...(title && { title }),
        ...(description && { description }),
        ...(body && { body }),
        ...(tags && { tags }),
    };

    // Only add coverImage if a new one is uploaded
    if (coverImage) {
        updateData.coverImage = coverImage.url;
    }

    // Update the blog using the constructed updateData
    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true, // Options to return the updated document and validate fields
    });

    if (!updatedBlog) {
        throw new ApiError(404, "Blog not found");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedBlog, "Blog updated successfully")
    );
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params

    const deletedBlog = await Blog.findByIdAndDelete(id);

    // Check if the blog was found and deleted
    if (!deletedBlog) {
        throw new ApiError(404, 'Blog not found');
    }

    // Send success response
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                deletedBlog,
                'Blog deleted successfully'
            )
        );
})

export {
    uploadBlogPost,
    userBlogs,
    blog,
    blogDetails,
    updateBlog,
    deleteBlog
}