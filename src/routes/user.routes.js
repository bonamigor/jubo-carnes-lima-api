const express = require('express');

const router = express.Router();
const userController = require('../controllers/users.controller');

// ==> GET http://localhost:3000/api/users
router.get('/users', userController.listAllUsers);

// ==> GET http://localhost:3000/api/users/id
router.get('/users/:id', userController.listOneUser);

// ==> POST http://localhost:3000/api/users
router.post('/users', userController.createUser);

// ==> PUT http://localhost:3000/api/users
router.put('/users', userController.updateUser);

// ==> DELETE http://localhost:3000/api/users
router.delete('/users', userController.deleteUser);

module.exports = router;
