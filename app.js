const p1=require('path');
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const sequelize=require('./util/database');

const app=express();
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', './views');

const adminRoutes = require('./routes/admin');
app.use(bodyParser.json({ extended: false }));
app.use(express.static(p1.join(__dirname,'public')));
   console.log('before route');
app.use('/admin',adminRoutes);
 console.log('after route');
sequelize.sync().then(result=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
});