const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URL);

// const Product = require('../models/product.model');