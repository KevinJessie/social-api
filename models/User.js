// dependencies
const { Schema, model } = require('mongoose');

// create schema
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'You need to provide a username!',
        trim: true
    },
    email: {
        type: String,
        required: 'You need to provide an email address!',
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [this]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
}
);

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;



