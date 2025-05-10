const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');
const {
   getUpcomingWorkshops,
   getPreviousWorkshops,
   getWorkshopById,
   registerForWorkshop,
   createWorkshop,
   updateWorkshopResources,
   deleteWorkshop
} = require('../controllers/workshop.controller');

const upload = require('../middlewares/multer.middleware');

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
 *               _id:
 *                 type: string
 *                 example: "12345"
 *               title:
 *                 type: string
 *                 example: "Time Management"
 *               description:
 *                 type: string
 *                 example: "Learn how to manage your time effectively."
 *               workshopImage:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
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
 *                 status: 
 *                   type: string
 *                   example: "Upcoming"
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
 *                      workshopImage:
 *                        type: string
 *                        example: "https://example.com/image.jpg"
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

/** 
 * @route     GET api/workshops/upcoming 
 * @desc       Get all upcoming workshops
 * @access     Public
 */

router.get('/workshops/upcoming', auth,  getUpcomingWorkshops);

/** 
 *  @swagger
 * /api/v1/workshops/previous:
 *   get:
 *     summary: Get all previous workshops
 *     description: This endpoint retrieves a list of all previous workshops.
 *     tags: [Workshops]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 example: "12345"
 *               title:
 *                 type: string
 *                 example: "Healthy Living"
 *               description:
 *                 type: string
 *                 example: "Learn how to live a healthy life."
 *               workshopImage:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
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
 *         description: A list of previous workshops
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 status: 
 *                   type: string
 *                   example: "Upcoming"
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
 *                      workshopImage:
 *                        type: string
 *                        example: "https://example.com/image.jpg"
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
 *                        examvple: "2024-10-01T10:00:00Z"
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
 * 
 * @route     GET api/workshops/previous
 * @desc       Get all previous workshops
 * @access     Public
 */
router.get('/workshops/previous', auth, getPreviousWorkshops);

/**
 *  @route     GET api/workshops/:workshopId
 * @desc       Get workshop by ID
 * @access     Public
 */
router.get('/workshops/:workshopId', auth, getWorkshopById);

/**
 * @swagger
 * /api/v1/workshops/{workshopId}/register:
 *   get:
 *     summary: Register for other courses
 *     description: This endpoint allows a user to register for upcoming workshops.
 *     parameters:
 *       - in: path
 *         name: workshopId
 *         required: true
 *         description: The ID of the workshop to register for.
 *         schema:
 *           type: string
 *           example: "1234567890abcdef12345678"
 *     tags: ["Workshops"]
 *     responses:
 *       200:
 *         description: Successfully registered for this workshop.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully registered for this workshop."
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 workshops:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "1234567890abcdef12345678"
 *                       title:
 *                         type: string
 *                         example: "Time Management"
 *                       description:
 *                         type: string
 *                         example: "Learn how to manage your time effectively."
 *                       workshopImage:
 *                         type: string
 *                         example: "https://example.com/course-image.jpg"
 * 
 *       401:
 *         description: Unauthorized:Please Login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: Please Login."
 *                 success:
 *                   type: boolean
 *                   example: false
 *       404: 
 *         description: No workshops found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No workshop found."
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Internal Server Error"
 *                  success:
 *                    type: boolean
 *                    example: false
 *  
 *  @route     POST api/workshops/{workshopId}/register
 * @desc       Register for a workshop
 * @access     Private
 */

router.post('/workshops/:workshopId/register', auth, registerForWorkshop);

/** 
 * @swagger
 * /api/v1/workshops/:
 *   post:
 *     summary: Create a new workshop
 *     description: This endpoint allows an admin to create a workshop
 *     content:
 *       application/json
 *       
 * 
 * @route     POST api/workshops/
 * @desc       Create a new workshop
 * @access     Private
 */

router.post('/workshops/', auth, authorizeRole('admin'), upload.fields([
   { name: 'workshopImage', maxCount: 1 },
   { name: 'resource', maxCount: 5 } 
]),createWorkshop);


router.patch('/workshops/:workshopId', auth, authorizeRole('admin'), upload.array('resource', 5), updateWorkshopResources);
/**
 * @swagger
 * /api/v1/workshops/{workshopId}/update:
 *   patch:
 *     summary: Update workshop resources
 *     description: This endpoint allows an admin to update the resources of a workshop.
 *     parameters:
 *       - in: path
 *         name: workshopId
 *         required: true
 *         description: The ID of the workshop to update.
 *         schema:
 *           type: string
 *           example: "1234567890abcdef12345678"
 *     tags: ["Workshops"]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               resource:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Successfully updated workshop resources.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Workshop resources updated successfully."
 * 
 * @route    PATCH api/workshops/:workshopId
 * @desc     Update workshop resources
 * @access   Private
 */

router.delete('/workshops/:workshopId', auth, authorizeRole('admin'), deleteWorkshop);


module.exports = router;