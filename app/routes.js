const router = require("express").Router()
const tokenValidate = require("../helpers/verify_token")

//MULTER - File Upload
const multer = require('multer')
var storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function (req, file, cb) {
            let extArray = file.mimetype.split("/");
            let extension = extArray[extArray.length - 1];
            // cb(null, file.originalname + '-' + Date.now() + "." + extension);
            cb(null, file.originalname);
        }
    }
);
const upload = multer({ storage })


//routes
const controller = require("../controller/index")

router.get('/example', tokenValidate, controller.example.test);

router.post('/register', controller.auth.register);
router.post('/login', controller.auth.login);
router.get('/profile', tokenValidate, controller.profile.index);
router.post('/profile/update', tokenValidate, upload.single('picture'), controller.profile.update);

router.get('/todos', tokenValidate, controller.todos.index);
router.post('/todos', tokenValidate, controller.todos.store);
router.get('/todos/:id', tokenValidate, controller.todos.show);
router.put('/todos/:id', tokenValidate, controller.todos.update);
router.delete('/todos/:id', tokenValidate, controller.todos.destroy);


module.exports = router