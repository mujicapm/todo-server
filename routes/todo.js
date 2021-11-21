var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const ToDo = require('../models/ToDo')

const privateKey = process.env.JWT_PRIVATE_KEY;

router.use(function(req, res, next) {
  console.log(req.header("Authorization"))
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, { algorithms: ['RS256'] })
      console.log(req.payload)
    } catch(error) {
      return res.status(401).json({"error": error.message});
    }
  } else {
    return res.status(401).json({"error": "Unauthorized"});
  }
  next()
})


/* GET home page. */
router.get('/', async function(req, res, next) {
  const todos = await ToDo.find().where('author').equals(req.payload.id).exec()
  return res.status(200).json({"todos": todos})
});

router.get('/:todoId', async function(req, res, next) {
  //const posts = await Post.find().where('author').equals(req.payload.id).exec()

  //mongoose find query to retrieve post where postId == req.params.postId
  const todo = await ToDo.findOne().where('_id').equals(req.params.todoId).exec()

  return res.status(200).json(todo)
});


router.post('/', async function (req, res) {
  const todo = new ToDo({
    "title": req.body.title,
    "description": req.body.description,
    "author": req.payload.id,
    "dateCreated": req.body.dateCreated,
    "isComplete": req.body.isComplete,
    "dateComplete": req.body.dateComplete
  })

  await todo.save().then( savedToDo => {
    return res.status(201).json({
      "id": savedToDo._id,
      "title": savedToDo.title,
      "description": savedToDo.content,
      "author": savedToDo.author,
      "dateCreated": savedToDo.dateCreated,
      "isComplete": savedToDo.isComplete,
      "dateComplete": savedToDo.dateComplete
    })
  }).catch( error => {
    return res.status(500).json({"error": error.message})
  });
})

module.exports = router;
