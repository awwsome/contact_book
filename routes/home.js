import express from 'express';

const router = express.Router();

// Home
router.get('/', (req, res) => {
    res.redirect('/contacts');
});

export default router;
