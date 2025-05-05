const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');
const {
   getUpcomingWorkshops,
   getPreviousWorkshops,
   getWorkshopById,
   registerForWorkshop,
   createWorkshop
} = require('../controllers/workshop.controller');

/**
 * @swagger
 * /api/v1/workshops/upcoming:
 *   get:
 *     summary: Get all upcoming workshops
 *     description: This endpoint retrieves a list of all upcoming workshops.
 *     tags: [Workshops]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               workshopId:
 *                 type: string
 *                 example: "12345"
 *               title:
 *                 type: string
 *                 example: "Time Management"
 *               description:
 *                 type: string
 *                 example: "Learn how to manage your time effectively."
 *               facilitator:
 *                 type: object
 *                 properties:
 *                   name: 
 *                     type: string
 *                     example: "Naana Abena"
 *                   email: 
 *                     type: string
 *                     example: "naanabena4@gmail.com"
 *               date:
 *                 type: string
 *                 example: "2024-10-01T10:00:00Z"
 *               duration:
 *                 type: string
 *                 example: "2 hours"
 *               location:
 *                 type: string
 *                 example: "Adenta, Accra"
 *               resource:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: "https://example.com/resource.pdf"
 *     responses:
 *       200:
 *         description: A list of upcoming workshops
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string   
 *                   example: "Upcoming workshops retrieved successfully."
 *                 data:
 *                  type: array
 *                  items: 
 *                    type: object
 *                    properties:
 *                      _id: 
 *                        type: string
 *                        example: "12345"
 *                      title: 
 *                        type: string
 *                        example: "Time Management"
 *                      description:
 *                        type: string
 *                        example: "Learn how to manage your time effectively."
 *                      facilitator:
 *                        type: object
 *                        properties:
 *                          name: 
 *                            type: string
 *                            example: "Naana Abena"
 *                          email:
 *                            type: string
 *                            example: "naanabena@gmail.com"
 *                      date:
 *                        type: string
 *                        example: "2024-10-01T10:00:00Z"
 *                      duration:
 *                        type: string
 *                        example: "2 hours"
 *                      location:
 *                        type: string
 *                        example: "Adenta, Accra"
 *                      resource:
 *                        type: array
 *                        items:
 *                          type: string
 *                          example: "https://example.com/resource.pdf"
 *                      attendees:
 *                        type: array
 *                        items:
 *                          type: string
 *                          example: ["1234567890abcdef12345678", "1234567890abcdef12345679", "1234567890abcdef12345680"]  
*/

/** @route     GET api/workshops/upcoming 
 * @desc       Get all upcoming workshops
 * @access     Public
 */

router.get('/workshops/upcoming', auth, getUpcomingWorkshops);

/** @route     GET api/workshops/previous
 * @desc       Get all previous workshops
 * @access     Public
 */
router.get('/workshops/previous', auth, getPreviousWorkshops);

/** @route     GET api/workshops/:workshopId
 * @desc       Get workshop by ID
 * @access     Public
 */
router.get('/workshops/:workshopId', auth, getWorkshopById);

/** @route     POST api/workshops/register
 * @desc       Register for a workshop
 * @access     Private
 */
router.post('/workshops/:workshopId/register', auth, registerForWorkshop);

/** @route     POST api/workshops/
 * @desc       Create a new workshop
 * @access     Private
 */
router.post('/workshops/', auth, authorizeRole('admin'), createWorkshop);

module.exports = router;