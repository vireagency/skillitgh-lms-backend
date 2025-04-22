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

/** @route     GET api/workshops/upcoming 
 * @desc       Get all upcoming workshops
 * @access     Public
 */

router.get('/upcoming', getUpcomingWorkshops);

/** @route     GET api/workshops/previous
 * @desc       Get all previous workshops
 * @access     Public
 */
router.get('/previous', getPreviousWorkshops);

/** @route     GET api/workshops/:workshopId
 * @desc       Get workshop by ID
 * @access     Public
 */
router.get('/:workshopId', getWorkshopById);

/** @route     POST api/workshops/register
 * @desc       Register for a workshop
 * @access     Private
 */
router.post('/register/:workshopId', registerForWorkshop);

/** @route     POST api/workshops/
 * @desc       Create a new workshop
 * @access     Private
 */
router.post('/', createWorkshop);

module.exports = router;