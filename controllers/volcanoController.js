const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
// const { isPostOwner } = require('../middlewares/creatureMiddlewares');
const Volcano = require('../models/Volcano');
const volcanoService = require('../services/volcanoService');
const { getErrorMessage } = require('../utils/errorUtils');


router.get('/catalog', async (req, res) => {
    const volcanoes = await volcanoService.getAll().lean();

    res.render('volcanoes/catalog', { volcanoes });
});

router.get('/create', isAuth, (req, res) => {
    res.render('volcanoes/create');
  });
  
router.post('/create', isAuth, async (req, res) => {
    const volcanoData = req.body;
    const userId = req.user._id;
  
    try {
      await volcanoService.create(userId, volcanoData);
      
      res.redirect('/volcanoes/catalog');
  
    } catch (err){
       console.log(err);
       res.render('volcanoes/create', {...volcanoData, error: getErrorMessage(err)})
    }
  });

//   router.get('/:creatureId/details', async (req, res) => {
//     const creatureId = req.params.creatureId;
//     const userId = req.user?._id;
//     try {
//       const creature = await creatureService.getOneDetailed(creatureId).lean();
//       const votes = creature.votes.map(user => user.email).join(', ');
//       const isOwner = creature.owner && creature.owner._id == userId;
//       const isVoted = creature.votes.some(user => user._id == userId);
//       const votesCount = Number(creature.votes.length);
//       const owner = creature.owner;

//       res.render('creatures/details', { ...creature, votes, isOwner, isVoted, votesCount, owner });
//     } catch (err) {
//       // console.log(err);
//       res.redirect('/');
//     }
// });

// router.get('/:creatureId/vote', isAuth, async (req, res) => {
//   try {
//     await creatureService.vote(req.params.creatureId, req.user._id);

//     res.redirect(`/creatures/${req.params.creatureId}/details`);

//   } catch (err) {
//     // console.log(err);
//     res.redirect('/');
//   }
// });

// router.get('/:creatureId/delete', isPostOwner, async (req, res) => {
//   await creatureService.delete(req.params.creatureId);

//   res.redirect('/creatures/all-posts');
// });

// router.get('/:creatureId/edit', isPostOwner, async (req, res) => {

//   res.render(`creatures/edit`, { ...req.creature });
// });

// router.post('/:creatureId/edit', isPostOwner, async (req, res) => {
//   const creatureData = req.body;
//   const creatureId = req.params.creatureId;

//   try {
//     await creatureService.edit(creatureId, creatureData);

//     res.redirect(`/creatures/${creatureId}/details`);
//   } catch (err) {
    
//     res.render(`creatures/edit`, {...creatureData, error: getErrorMessage(err)});
//   }
// });


module.exports = router;