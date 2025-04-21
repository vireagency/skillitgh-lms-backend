const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth.middleware');
const { 
   getUpcomingWorkshops,
   getPreviousWorkshops, 
   getWorkshopById, 
   registerForWorkshop,
   createWorkshop 
} = require('../controllers/workshop.controller');

router.get('/upcoming', getUpcomingWorkshops);
router.get('/previous', getPreviousWorkshops);
router.get('/:workshopId', getWorkshopById);
router.post('/register', auth, registerForWorkshop);
router.post('/upload', createWorkshop);

module.exports = router;