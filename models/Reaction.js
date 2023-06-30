// dependencies
const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// create reaction schema
const ReactionSchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment's _id field
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'You need to provide a reaction!',
            maxlength: 280
        },
        username: {
            type: String,
            required: 'You need to provide a username!'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// export the ReactionSchema
module.exports = ReactionSchema;

