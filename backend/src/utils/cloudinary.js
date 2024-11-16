import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localPath) => {
    try {
        if (!localPath) return null;
        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: "auto"
        })
        fs.unlinkSync(localPath)
        return response;
    } catch (error) {
        fs.unlinkSync(localPath)
        return null;
    }
}
const deleteOnCloudinary = (url) => {
    const publicId = getPublicIdFromUrl(url);

    if (publicId) {
        cloudinary.uploader.destroy(publicId, function (error, result) {
            if (error) {
                console.error('Error deleting resource:', error);
            } else {
                console.log('Successfully deleted resource:', result);
            }
        });
    } else {
        console.error('Public ID not found in URL');
    }
};

export { uploadOnCloudinary,deleteOnCloudinary }