const express = require('express');
const Blog = require('../models/blog');

const router = express.Router();

router.get('/all-blogs', (req, res)=>{
  Blog.find().sort({createdAt: -1})
    .then(result=>{
      res.render('index', {title:'All Blogs', blogs:result});
    })
    .catch(err=>{
      console.log(err)
    })
})

router.post('/all-blogs', (req, res)=>{
  const blog =  new Blog(req.body);

  blog.save()
    .then(result=>{
      res.redirect('/all-blogs')
    })
    .catch(err=>{
      console.log(err)
    })
})

// single blog
router.get('/all-blogs/:id', (req, res)=>{
  const id = req.params.id;

  Blog.findById(id)
    .then(result=>{
      res.render('details', {title:'Blog Details', blog:result})
    })
    .catch(err=>{
      res.status(404).render('404', {title:'Page not found'})
    })
})

router.delete('/all-blogs/:id', (req, res)=>{
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(result=>{
      res.json({ redirect: '/all-blogs' })
    })
    .catch(err=>{
      console.log(err)
    })
})

router.get('/create', (req, res)=>{
  res.render('create', {title: 'Create new blog'});
})

module.exports = router;