// dependencies
const { User } = require('../models');

// user controller
const userController = {
    // get all users
    getAllUsers(_req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            // newest user to oldest user
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                // 400: bad request
                res.status(400).json(err);
            }
            );
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                // if no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            }
            )
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            }
            );
    },

    // create user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err)
            );
    },

    // update user by id
    updateUser({ params, body }, res) { 
        User.findOneandUpdate(params, body
            // { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData)
            }
            )
            .catch(err => res.status(400).json(err)
            );
    },

    // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                // if no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                // remove user from any friends arrays
                User.updateMany(
                    { _id: { $in: dbUserData.friends } },
                    { $pull: { friends: params.id } }
                )
                    .then(() => {
                        // remove user's thoughts
                        Thought.deleteMany({ username: dbUserData.username })
                            .then(() => {
                                res.json({ message: 'Successfully deleted user!' });
                            }
                            )
                            .catch(err => res.status(400).json(err)
                            );
                    }
                    )
                    .catch(err => res.status(400).json(err)
                    );
            }
            )
            .catch(err => res.status(400).json(err)
            );
    },

    // add friend   
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            // { new: true, runValidators: true }
        )
            .then(dbUserData => {
                // if no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData)
            }
            )
            .catch(err => res.status(400).json(err)
            );
    },

    // remove friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            // { new: true, runValidators: true }
        )
            .then(dbUserData => {
                // if no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData)
            }
            )
            .catch(err => res.status(400).json(err)
            );
    }
};

module.exports = userController;

