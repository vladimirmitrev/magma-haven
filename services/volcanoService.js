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

exports.getOne = (volcanoId) => Volcano.findById(volcanoId);

exports.getOneDetailed = (volcanoId) => this.getOne(volcanoId).populate('owner').populate('voteList');

exports.vote = async (volcanoId, userId) => {
    await Volcano.findByIdAndUpdate(volcanoId, { $push: { voteList: userId } });
    await User.findByIdAndUpdate(userId, { $push: { votedPosts: volcanoId } });
  
};

exports.delete = (volcanoId) => Volcano.findByIdAndDelete(volcanoId);

exports.edit = (volcanoId, volcanoData) => Volcano.findByIdAndUpdate(volcanoId, volcanoData,{ runValidators: true});

exports.search = (name, typeVolcano) => {
    let query = {};
  
    if(name) {
      query.name = new RegExp(name, 'i');
    }

    if(typeVolcano) {
        query.typeVolcano = typeVolcano
      }

    
    return Volcano.find(query);
  };