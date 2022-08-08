const router = require('express').Router();
const { checkSchema } = require('express-validator');

const Product = require('../../models/product.model');
const User = require('../../models/user.model');

const createProductValidator = require('../../validators/createProduct.validator');
const { checkValidationErrors } = require('../../helpers/middleware');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
});

router.get('/add/:productId', async (req, res) => {
  const { productId } = req.params;

  req.user.products.push(productId);
  await req.user.save();

  res.json({ success: 'producto agregado' });
});

router.get('/cart', async (req, res) => {
  const user = await User.findById(req.user._id).populate('products');

  res.json(user.products);
});

router.get('/users/profile', async (req, res) => {


});




router.post('/', checkSchema(createProductValidator), checkValidationErrors, async (req, res) => {

  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:idProduct', async (req, res) => {
  try {
    const { idProduct } = req.params;
    const producto = await Product.findByIdAndUpdate(idProduct, req.body, { new: true });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.delete('/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const productDel = await Product.findByIdAndDelete(productId)
    res.status(200).json(productDel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }


});




module.exports = router;
