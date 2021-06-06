const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

//home
router.get('/', blogController.blog_index);

//send post data to server
router.post('/', blogController.blog_create_post);

//create new blog
router.get('/create', blogController.blog_create_get);

//devolver blog por id
router.get('/:id', blogController.blog_details);

//delete por id
router.delete('/:id', blogController.blog_delete);

module.exports = router;
