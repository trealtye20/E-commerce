const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(tagData);
  }
  catch(err){
    res.status(500).json(err)
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findOne({
      include: [Product], where :{
        id: req.params.id
      }
    });
    res.status(200).json(tagData);
  }
  catch(err){
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    
  .then((tag) => 
    res.status(200).json(tag))
    .catch((err) => 
      res.status(400).json(err));
  });

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      id: req.params.id,
    tag_Name: req.body.tag_Name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((tag) => {
      res.json(tag);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((tag) => {
    res.json(tag);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
