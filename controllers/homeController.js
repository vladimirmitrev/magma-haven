const router = require('express').Router();
const { getErrorMessage } = require('../utils/errorUtils');
const { isAuth } = require('../middlewares/authMiddleware');
const volcanoService = require('../services/volcanoService');

router.get('/', async (req, res) => {

  res.render('home');
});

router.get('/search', isAuth, async (req, res) => {
  const { name, typeVolcano } = req.query; 
  
  try {
    const volcanoes = await volcanoService.search(name, typeVolcano).lean();

    res.render('search', { volcanoes, name, typeVolcano });

  } catch (err) {
    res.render('search', { error: getErrorMessage(err), name, typeVolcano })
  }

});

module.exports = router;
