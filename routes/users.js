var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User')

const privateKey = process.env.JWT_PRIVATE_KEY;

// router.use(function(req, res, next) {
//     console.log(req.header("Authorization"))
//     if (req.header("Authorization")) {
//         try {
//             req.payload = jwt.verify(req.header("Authorization"), privateKey, { algorithms: ['RS256'] })
//             console.log(req.payload)
//         } catch(error) {
//             return res.status(401).json({"error": error.message});
//         }
//     } else {
//         return res.status(401).json({"error": "Unauthorized"});
//     }
//     next()
// })


/* GET home page. */
router.get('/', async function(req, res, next) {
    const users = await User.find({ }, { username: 1, todos: 1 }  ).exec()
    return res.status(200).json({"users": users})
});

router.get('/:id', async function(req, res, next) {
    //const posts = await Post.find().where('author').equals(req.payload.id).exec()

    //mongoose find query to retrieve post where postId == req.params.postId
    const user = await User.findOne().where('id').equals(req.params.id).exec()

    return res.status(200).json(user)
});

module.exports = router;
