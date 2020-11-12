const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const MONGODB_URI =
  'mongodb+srv://hillstarteam1:Hsteam2344@cluster0.zak2b.mongodb.net/shop';



const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'assets')));

app.use(shopRoutes);


app.get('/500', errorController.get500);

app.use(errorController.get404);







mongoose
  .connect(MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
 mongoose.connection.on('error', err => {
     console.log(err);
  });