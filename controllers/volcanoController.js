const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const { isPostOwner } = require('../middlewares/volcanoMiddlewares');
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

  router.get('/:volcanoId/details', async (req, res) => {
    const volcanoId = req.params.volcanoId;
    const userId = req.user?._id;
    try {
      const volcano = await volcanoService.getOneDetailed(volcanoId).lean();
      // const votes = volcano.votes.map(user => user.email).join(', ');
      const isOwner = volcano.owner && volcano.owner._id == userId;
      const isVoted = volcano.voteList.some(user => user._id == userId);
      const votesCount = Number(volcano.voteList.length);
      const owner = volcano.owner;

      res.render('volcanoes/details', { ...volcano, isOwner, isVoted, votesCount, owner });
    } catch (err) {
      console.log(err.message);
      res.redirect('/');
    }
});

router.get('/:volcanoId/vote', isAuth, async (req, res) => {
  try {
    await volcanoService.vote(req.params.volcanoId, req.user._id);

    res.redirect(`/volcanoes/${req.params.volcanoId}/details`);

  } catch (err) {
    // console.log(err);
    res.redirect('/');
  }
});

router.get('/:volcanoId/delete', isPostOwner, async (req, res) => {
  await volcanoService.delete(req.params.volcanoId);

  res.redirect('/volcanoes/catalog');
});

router.get('/:volcanoId/edit', isPostOwner, async (req, res) => {

  res.render(`volcanoes/edit`, { ...req.volcano });
});

router.post('/:volcanoId/edit', isPostOwner, async (req, res) => {
  const volcanoData = req.body;
  const volcanoId = req.params.volcanoId;

  try {
    await volcanoService.edit(volcanoId, volcanoData);

    res.redirect(`/volcanoes/${volcanoId}/details`);
  } catch (err) {
    
    res.render(`volcanoes/edit`, {...volcanoData, error: getErrorMessage(err)});
  }
});


module.exports = router;