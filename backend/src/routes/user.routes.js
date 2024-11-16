import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    getCurrentUser, 
    uplaodImage,
} from "../controllers/user.controller.js";
import{
    uploadBlogPost,
    userBlogs,
    blog,
    blogDetails,
    updateBlog,
    deleteBlog,
} from "../controllers/blog.controller.js"
import{
    addComment,
    getComments
} from "../controllers/comment.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/register').post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route('/upload').post(
    upload.fields([
        {
            name: "image",
            maxCount: 1
        }
    ]),
    uplaodImage
)

router.route('/login').post(loginUser)

router.route("/logout").post(verifyjwt, logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/current-user").get(verifyjwt,getCurrentUser)

router.route("/userBlogs").get(verifyjwt, userBlogs)

router.route("/blogs/:id").get(blogDetails)

router.route("/blogs/:id").put(verifyjwt, upload.fields([
    {
        name: "coverImage",
        maxCount: 1
    }
]), updateBlog)

router.route("/blogs/:id").delete(verifyjwt, deleteBlog)

router.route("/blogs").get(blog)

router.route("/blogs").post(verifyjwt, upload.fields([
    {
        name: "coverImage",
        maxCount: 1
    }
]),uploadBlogPost)

router.route("/comments").post(verifyjwt,addComment)

router.route("/comments/:id").get(verifyjwt,getComments)

export default router
