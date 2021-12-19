const express = require('express');

const router = express.Router();
const userController = require('../controllers/users.controller');

// ==> GET http://localhost:3000/api/users
router.get('/users', userController.listAllUsers);

// ==> GET http://localhost:3000/api/users/id
router.get('/users/:id', userController.listOneUser);

// ==> POST http://localhost:3000/api/users/admin
router.post('/users/admin', userController.createAdminUser);

// ==> POST http://localhost:3000/api/users/regular
router.post('/users/regular', userController.createRegularUser);

// ==> PUT http://localhost:3000/api/users/admin
router.put('/users/admin', userController.updateUserAdmin);

// ==> PUT http://localhost:3000/api/users/regular
router.put('/users/regular', userController.updateUserRegular);

// ==> DELETE http://localhost:3000/api/users
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
