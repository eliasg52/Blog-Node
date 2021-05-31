const express = require('express');

//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

//listen to requests
app.listen(3000);

app.get('/', (req, res) => {
  /* res.send('HOME'); */
  /*   res.sendFile('./views/index.html', { root: __dirname }); */
  res.render('index');
});

app.get('/about', (req, res) => {
  // res.send('about');
  res.render('about');
});

app.get('/blogs/create', (req, res) => {
  res.render('create');
});
/* //redireccion
app.get('/about-me', (req, res) => {
  res.redirect('/about ');
}); */

//error 404
app.use((req, res) => {
  res.status(404).render('404');
});
