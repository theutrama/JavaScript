const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const { result } = require('lodash');
const blogRoutes = require("./routes/blogRoutes");


//express app
const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://kochi:kochi@cluster0.ivrtv.mongodb.net/nodeFirstTry?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

//register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));



//routes
app.get('/', (req, res) => {
    res.redirect("/blogs");
});

//blog routes
app.use("/blogs", blogRoutes);

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
});


//404
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})