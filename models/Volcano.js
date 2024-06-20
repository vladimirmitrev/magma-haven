const mongoose = require('mongoose');

const volcanoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name should be at least 2 characters']
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: [3, 'Location should be at least 3 characters']
    },
    elevation: {
        type: Number,
        required: [true, 'Elevation is required!'],
        min: [0, 'Elevation should be minimum 0']
    },
    lastEruption: {
        type: Number,
        required: [true, 'Last Eruption is required!'],
        min: [0, 'Last Eruption year should be minimum 0'],
        max: [2024, 'Last Eruption year should be maximum 2024']
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        match: [/^https?:\/\//, 'Image must be an URL!'],
    },
    typeVolcano: {
        type: String,
        required: [true, 'Type volcano is required!'],
        enum: { 
            values: ['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Stratovolcanoes', 'Shield'],
            message: 'Enter a valid type of volcano'
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description should be at least 10 characters'],
    },
    voteList : [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
}, 
{ timestamps: true}
);

const Volcano = mongoose.model('Volcano', volcanoSchema);

module.exports = Volcano;
