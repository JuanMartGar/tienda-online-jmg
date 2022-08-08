const mongoose = require('mongoose');

const Product = require('./models/product.model');

(async()=>{
  await mongoose.connect('mongodb://127.0.0.1/tienda-online');

  //crear un producto
  // await Product.create({
  //   name: 'Guantes',
  //   description: 'para proteger manos',
  //   price: 4,
  //   department: 'almacen',
  //   available: true,
  //   created_at: new Date()
  // });


  // Recuperar documentos
  const products = await Product.find();
  console.log(products.map(p => p.name));

  const productsModa = await Product.find({
    department:'oficina',
    available: true
  });
  // console.log(productsModa);

  const productsPrecio = await Product.find({
    price: {$gt: 40} //$gte, $lt $lte
  });
  // console.log(productsPrecio);

  const options = {
    $and: [
      { available: true},
      { price: { $lt: 30 } }
    ]
  }
  
  const productsOr = await Product.find(options)
  console.log(productsOr);
  


  await mongoose.disconnect();

})();

