const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
res.render('home', { products: [] });
});
router.get('/realtimeproducts', (req, res) => {
  res.render('realtimeproducts', { products: [] });
});

module.exports = router;