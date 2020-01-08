const router = require('express').Router();

const validate = require('./api/middlewares/token-validation')

const UserController = require('./api/controllers/UserController');
const RoomController = require('./api/controllers/RoomController');


router.get('/users/validation', validate.validation);

router.get('/users', validate.user, UserController.index);
router.post('/users', UserController.create);
router.post('/users/login', UserController.login);
router.delete('/users', validate.admin, UserController.deleteMany);
router.delete('/users/:userId', validate.user, UserController.deleteOne);

router.get('/rooms', validate.user, RoomController.index);
router.get('/rooms/:userId', validate.user, RoomController.find);
router.post('/rooms', validate.user, RoomController.create);
router.delete('/rooms', validate.admin, RoomController.deleteMany);
router.delete('/rooms/:roomId', validate.user, RoomController.deleteOne);
router.patch('/rooms/:roomId', validate.user, RoomController.insertMessage);
router.patch('/rooms/:roomId', validate.user, RoomController.insertUser);

module.exports = router;

