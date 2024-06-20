const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [2, 'Username should be at least 2 characters'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: [10, 'Email should be at least 10 characters'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password should be at least 4 characters']
    },
    createdPosts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Volcano',
    }],
    votedPosts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Volcano',
    }],
}, {
    collation: {
        locale: 'en',
        strength: 2
    }, 
    timestamps: true
}
);

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
