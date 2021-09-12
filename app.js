const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

 //express app
const app = express();

// connect to database
mongoose.connect('mongodb://localhost/ninja', {useNewUrlParser: true, useUnifiedTopology : true})
  .then(result=>{
    console.log('Connected to the DB')  
    // listen for requests
    app.listen(5000);
    console.log('Listening for requests')
  })
  .catch(err=>{
    console.log(err) 
  })


// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static(('public')));
app.use(express.urlencoded({extended:true}));


// routes
app.get('/', (req, res)=>{
  res.redirect('/all-blogs');
})

app.get('/about', (req, res)=>{
  res.render('about', {title: 'About us'});
})

// blog routes
app.use(blogRoutes);

app.use((req, res)=>{
  res.status(404).render('404', {title:'Page not found'});
})