const { Router } = require('express');
const ProductsService = require('../services/product.service');
const validateorHandler =require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require("../schemas/product.schema")
const router = Router();

const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();

  res.json(products);
});
//los endpoints especificos deben ir antes que los dinamicos
router.get('/filter', (req, res) => {
  res.send('yo soy un filter');
});

router.get('/:id',
validateorHandler(getProductSchema, "params"),
async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await service.findOne(id);
    res.json({
      product,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/',
validateorHandler(createProductSchema, "body"),
async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id',
validateorHandler(getProductSchema, "params"),
validateorHandler(updateProductSchema, "body"),
 async (req, res) => {
  try {
    const { id } = req.params;

    const body = req.body;

    const product = await service.update(id, body);

    res.json(product);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
