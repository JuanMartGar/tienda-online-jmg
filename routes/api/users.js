const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { checkToken } = require('../../helpers/middleware');
const { createToken } = require('../../helpers/utils');

const User = require('../../models/user.model')


router.get('/profile', checkToken, async (req, res) => {
  const user = await User.findById(req.user._id).populate('products');
  res.json(user);
});



router.post('/register', async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 11)
    const user = await User.create(req.body);;
    res.json(user);

  } catch (err) {
    res.json({ error: err.message });
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // ¿existe email en la BD?
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ error: 'Error en email y/o contraseña' });
    }

    //coinciden las password??
    const iguales = bcrypt.compareSync(password, user.password);
    if (!iguales) {
      return res.status(401).json({ error: 'Error en email y/o contraseña' });
    }

    res.json({
      success: 'Buen login chaval',
      token: createToken(user)
    });

  } catch (err) {
    res.json({ error: err.message });
  }


});


module.exports = router;
