const router = require('express').Router();
const authController = require('./../controller/authController');


router.post('/register', async (req, res) => {
    res.send(await authController.register(req.body));
});



router.post('/login', async (req, res) => {
    res.send(await authController.login(req.body));
});

module.exports = router;