const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.json({ msg: 'this is tweets route' }));

module.exports = router;
