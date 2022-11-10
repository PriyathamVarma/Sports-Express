// Imports
const express = require('express');
const app = express();

// Axios
const axios = require('axios');

// CORS
const cors = require('cors');

// Middleware for JSON data recieving
app.use(express.json());
app.use(cors());

// ENV
const dotenv = require('dotenv');
dotenv.config();

// Mongoose 
const mongoose = require('mongoose');
const DB = process.env.DATABASE;
mongoose.connect(DB).then(()=>{
    console.log('DB is connected')
}).catch((err)=>{
    console.log(err);
});

// Product    
// Product Schema
const productSchema = new mongoose.Schema({
    Name       : String,
    Subname    : String,
    Category   : String,
    link       : String,
    description: String,
    price      : Number
  });

// Product Modal
const productModal = mongoose.model('lists',productSchema);  

// ORDERS
// Order Schema
// const orderSchema = new mongoose.Schema({
//      User     : String,
//      food     : Array,
//      Location : String,
//  });

// // Order Modal
// const orderModal = mongoose.model('Orders',orderSchema);   

// Routes

// Products
// Create
app.post('/products/create',async(req,res)=>{

    const _body = req.body;

    // const _Name        = _body.Name;
    // const _Subname     = _body.Subname;
    // const _category    = _body.Category;
    // const _link        = _body.link;
    // const _price       = _body.price;
    // const _description = _body.description;

    const _Name        = "Blue shirt";
    const _Subname     = "By HRX 2";
    const _category    = "T-shirt";
    const _link        = "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a229b012-c62d-4f89-9ed2-3fca4bbe274a/air-jordan-1-retro-high-og-shoes.png";
    const _price       = "500";
    const _description = "the best in the town";


    const newdata = new productModal({

    Name       : _Name,
    Subname    : _Subname,
    Category   : _category,
    link       : _link,
    description: _description,
    price      : _price

    });

    newdata.save();

    const reqData = await productModal.find();
    res.send(reqData);
})

// Read all
app.get('/products/all',async(req,res)=>{

    const reqData = await productModal.find();
    res.send(reqData);

});

// Read by id
app.get('/products/:id',async(req,res)=>{

    const _id = req.params.id;

    const reqData = await productModal.findById(_id);
    res.send(reqData);

});



app.listen(8082,()=>{
    console.log(`http://localhost:8082`);
})