const router = require('express').Router();

const validate = require('./api/middlewares/token-validation')

const UserController = require('./api/controllers/UserController');
const RoomController = require('./api/controllers/RoomController');


router.get('/users', UserController.index);
router.post('/users', UserController.create);
router.post('/users/login', UserController.login);
router.delete('/users', UserController.deleteMany);
router.delete('/users/:userId', UserController.deleteOne);

router.get('/rooms', RoomController.index);
router.get('/rooms/:roomId', RoomController.index);
router.post('/rooms', RoomController.create);
router.delete('/rooms', validate, RoomController.deleteMany);
router.delete('/rooms/:roomId', RoomController.deleteOne);
router.patch('/rooms/:roomId', RoomController.insertMessage);
router.patch('/rooms/:roomId', RoomController.insertUser);


module.exports = router;

