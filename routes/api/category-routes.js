const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(categoryData);
  }
  catch(err){
    res.status(500).json(err)
  }
});
router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findOne({
      include: [Product], where :{
        id: req.params.id
      }
    });
    res.status(200).json(categoryData);
  }
  catch(err){
    res.status(500).json(err)
  }
});


router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    
  .then((category) => 
    res.status(200).json(category))
    .catch((err) => 
      res.status(400).json(err));
  });


router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      id: req.params.id,
    category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((category) => {
      res.json(category);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((catoregy) => {
    res.json(catoregy);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
