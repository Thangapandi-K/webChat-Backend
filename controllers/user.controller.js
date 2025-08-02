import User from "../models/user.model.js";
import { deleteInCloudinary, uploadToCloudinary } from "../config/cloudinary.config.js"


const userController = {
    // edit profile
    editProfile: async(request, response) => {
        try {
            // get user data
            const { bio, mode } = request.body;
            if(!bio && !mode ) {
                return response.status(400).json({ success: false, message: "Provide all details !" });
            }
            // update user bio
            const updatedUser = await User.findByIdAndUpdate(request.userId, {
                $set : {
                    bio: bio,
                    isAccountPrivate: mode
                }
            }, { 
                new: true,                    
            });
            // success response
            return response.status(201).json({ success: true, message: "User Updated successfully !", updatedUser: { bio: updatedUser.bio, isAccountPrivate: updatedUser.isAccountPrivate } });
        } catch (error) {
            return response.status(500).json({ success: true, message: error.message });
        }
    },
    updateDisplayPic: async(request, response) => {
        try {   
            // get user 
            const user = await User.findById(request.userId);
            // check if old image exists and delete
            if(user.displayPicture.path) {
                await deleteInCloudinary(user.displayPicture.id);
                user.displayPicture.path = null;
                user.displayPicture.id = null;
            };
            // upload new image
            const uploadResponse = await uploadToCloudinary("profiles", request.file.buffer);
            // save the image response details
            user.displayPicture.path = uploadResponse.secure_url;
            user.displayPicture.id = uploadResponse.public_id;
            await user.save();
            // success response
            return response.status(201).json({ success: true, message: "Profile Picture Updated Successfully !", data: uploadResponse.secure_url});
        } catch (error) {
            return response.status(500).json({ success: true, message: error.message });
        }
    },
    removeDisplayPic: async(request, response) => {
        try {
            // get user 
            const user = await User.findById(request.userId);
            // check if old image exists and delete
            if(!user.displayPicture.path) {
                return response.status(400).json({ success: true, message: "No Profile Picture Found !"});
            };
            await deleteInCloudinary(user.displayPicture.id);
            user.displayPicture.path = null;
            user.displayPicture.id = null;
            // save the updated user
            await user.save();
            // success response
            return response.status(200).json({ success: true, message: "Profile Picture Removed Successfully !"});
        } catch (error) {
            return response.status(500).json({ success: true, message: error.message });
        }
    }
};

export default userController;