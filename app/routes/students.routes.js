const express = require('express');
const student = require('../controllers/student.controller.js');

const router = express.Router();

//********************************* GET
//Read all student.
router.get('/', student.findAll);

//Read one student with the id.
router.get('/:studentId', student.findById);

//Read all student with light infos.
router.get('/light', student.findAllLight);

//Read all student with filter
router.get('/filter', student.filterBySerious);

//Read all student with word in description.
router.get('/contains/:word', student.containsWord);

//Read al student with birthday supérieur à date.
router.get('/superior/:date', student.superiorDate);

//Read all student ordonnées par leur date de naissance, suivant :order
router.get('/order/:order', student.order);

//********************************** PUSH
// Create a student.
router.post('/', student.create);


// Update Student by ID
router.put('/:studentId', student.update);

router.put('/:studentId/changeSerious', student.changeSerious);

router.delete('/:studentId', student.delete);

router.delete('/deleteSerious', student.deleteSerious);

module.exports = router;
