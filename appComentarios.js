const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const BlogModel = require('./models/blog');

//express app
const app = express();

//Connect to MondoDB
const dbURI =
  'mongodb+srv://eliasdb:35424255@cluster0.nh4m2.mongodb.net/node-blog?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  //el objeto es para que no nos tire errores en la consola
  /* .then((result) => console.log('Conectado a la base de datos')) funcion anonima que se dispara cuando se realiza la conexion a la db*/
  .then((result) => app.listen(3000)) //listen to requests
  .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//middleware y archivos estaticos
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//mongoose and mongo sandbox routes
/* app.get('/add-blog', (req, res) => {
  const blog = new BlogModel({
    title: 'new blog2',
    snippet: 'about my new blog',
    body: 'more about my new blog',
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get('/all-blogs', (req, res) => {
  BlogModel.find().then((result) => {
    res.send(result).catch((err) => console.log(err));
  });
});

app.get('/single-blog', (req, res) => {
  BlogModel.findById('60bacf7c9f7b4417b807a433')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});
 */
/*EJEMPLO MIDDLEWARE
 app.use((req, res, next) => {
  console.log('request hecha');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.use((req, res, next) => {
  console.log('Dentro del middleware siguiente');
  next();
});
 */

//routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
  /* res.send('HOME'); */
  /*   res.sendFile('./views/index.html', { root: __dirname });
  const blogs = [
    { title: 'Yoshi encuentra huevos', snippet: 'Lorem ipsum dolor sit' },
    { title: 'Mario encuentra estrellas', snippet: 'Lorem ipsum dolor sit' },
    { title: 'Luigi encuentra apiradoras', snippet: 'Lorem ipsum dolor sit' },
  ];

  res.render('index', { title: 'Home', blogs }); */
});

app.get('/about', (req, res) => {
  // res.send('about');
  res.render('about', { title: 'About' });
});

//blog routes

app.get('/blogs', (req, res) => {
  BlogModel.find()
    .then((result) => {
      res.render('index', { title: 'Blogs', blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

//send post data to server
app.post('/blogs', (req, res) => {
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

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create' });
});

//devolver blog por id
app.get('/blogs/:id', (req, res) => {
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
app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;

  BlogModel.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
      console.log(err);
    });
});

/* //redireccion
app.get('/about-me', (req, res) => {
  res.redirect('/about ');
}); */

//error 404
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
