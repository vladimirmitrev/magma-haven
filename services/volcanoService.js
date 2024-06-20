const Volcano = require('../models/Volcano');
const User = require('../models/User');

exports.create = async (userId, volcanoData) => {
    const createdVolcano = await Volcano.create({
        owner: userId,
        ...volcanoData,
    });

    await User.findByIdAndUpdate(userId, { $push: { createdPosts: createdVolcano._id } });
    
    return createdVolcano;
}

exports.getAll = () => Volcano.find();

// exports.getOne = (creatureId) => Creature.findById(creatureId);

// exports.getOneDetailed = (creatureId) => this.getOne(creatureId).populate('owner').populate('votes');

// exports.vote = async (creatureId, userId) => {
//     await Creature.findByIdAndUpdate(creatureId, { $push: { votes: userId } });
//     await User.findByIdAndUpdate(userId, { $push: { votedPosts: creatureId } });
  
// };

// exports.delete = (creatureId) => Creature.findByIdAndDelete(creatureId);

// exports.edit = (creatureId, creatureData) => Creature.findByIdAndUpdate(creatureId, creatureData,{ runValidators: true});
