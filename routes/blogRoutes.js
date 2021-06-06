const express = require('express');
const BlogModel = require('../models/blog');
const router = express.Router();

router.get('/', (req, res) => {
  BlogModel.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'Blogs', blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

//send post data to server
router.post('/', (req, res) => {
  /* console.log(req.body); */
  const blog = new BlogModel(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/create', (req, res) => {
  res.render('create', { title: 'Create' });
});

//devolver blog por id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  BlogModel.findById(id)
    .then((result) => {
      res.render('details', { blog: result, title: 'Blog details' });
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete por id
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  BlogModel.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
