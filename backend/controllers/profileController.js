const User = require("../models/User");


// GET PROFILE
exports.getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// UPDATE PROFILE
exports.updateProfile = async (req, res) => {

    try {

        const {
            name,
            email,
            bio,
            profilePicture
        } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (name !== undefined) {
            user.name = name;
        }

        if (email !== undefined) {
            user.email = email;
        }

        if (bio !== undefined) {
            user.bio = bio;
        }

        if (profilePicture !== undefined) {
            user.profilePicture = profilePicture;
        }

        await user.save();

        res.json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio,
                profilePicture: user.profilePicture
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};