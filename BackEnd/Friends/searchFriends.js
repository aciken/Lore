const User = require('../User/User');

const searchFriends = async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try {
        const user = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });

        if (user) {
            // Return a simplified user object to avoid sending sensitive data
            const userData = {
                id: user._id,
                name: user.name,
                username: user.username,
            };
            res.status(200).json(userData);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error searching for user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = searchFriends;
