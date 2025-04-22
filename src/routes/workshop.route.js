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

router.get('/workshops/upcoming', getUpcomingWorkshops);

/** @route     GET api/workshops/previous
 * @desc       Get all previous workshops
 * @access     Public
 */
router.get('/workshops/previous', getPreviousWorkshops);

/** @route     GET api/workshops/:workshopId
 * @desc       Get workshop by ID
 * @access     Public
 */
router.get('/workshops/:workshopId', getWorkshopById);

/** @route     POST api/workshops/register
 * @desc       Register for a workshop
 * @access     Private
 */
router.post('/workshops/:workshopId/register',auth, registerForWorkshop);

/** @route     POST api/workshops/
 * @desc       Create a new workshop
 * @access     Private
 */
router.post('/workshops/', createWorkshop);

module.exports = router;