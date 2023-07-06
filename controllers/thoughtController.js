// dependencies
const { User, Thought } = require('../models');

// thought controller
const thoughtController = {
    // get all thoughts
    getAllThoughts(res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            // newest thought to oldest thought
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                // 400: bad request
                res.status(400).json(err);
            }
            );
    },

    // get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                // if no thought is found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            }
            )
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            }
            );
    },

    // create thought
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => { // destructure _id from thoughtData
                return User.findOneAndUpdate(
                    { username: body.username }, // find user by username
                    { $push: { thoughts: _id } }, // add thought to user's thoughts array
                    { new: true } // return updated user
                );
            }
            )
            .then(dbUserData => {
                // if no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this username!' });
                    return;
                }
                res.json(dbUserData);
            }
            )
            .catch(err => res.json(err));
    },

    // update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id }, // find thought by id
            body, // update thought text
            { new: true, runValidators: true } // return updated thought
        )
            .then(dbThoughtData => {
                // if no thought is found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            }
            )
            .catch(err => res.status(400).json(err));
    },

    // delete thought by id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id }) // find thought by id and delete
            .then(dbThoughtData => {
                // if no thought is found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                // remove thought from user's thoughts array
                return User.findOneAndUpdate(
                    { username: dbThoughtData.username },
                    { $pull: { thoughts: params.id } },
                    { new: true }
                );
            }
            )
            .then(dbUserData => {
                // if no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this username!' });
                    return;
                }
                res.json(dbUserData);
            }
            )
            .catch(err => res.status(400).json(err));
    },

    // add reaction to thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId }, // find thought by id
            { $push: { reactions: body } }, // add reaction to thought's reactions array
            { new: true, runValidators: true } // return updated thought
        )
            .then(dbThoughtData => {
                // if no thought is found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            }
            )
            .catch(err => res.status(400).json(err));
    },

    // remove reaction from thought
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId }, // find thought by id
            { $pull: { reactions: { reactionId: params.reactionId } } }, // remove reaction from thought's reactions array
            { new: true } // return updated thought
        )
            .then(dbThoughtData => {
                // if no thought is found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            }
            )
            .catch(err => res.status(400).json(err));
    }
};

// export thought controller
module.exports = thoughtController;

