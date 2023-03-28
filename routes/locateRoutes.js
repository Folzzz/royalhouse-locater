const express = require('express');

const router = express.Router();
// custom
const { getLocation, addLocation, editLocation, deleteLocation, getSingleLocation } = require('../controller/locateController');

// @route GET /api/v1/locate
// @access PUBLIC
router.get('/locate', getLocation);

// @route POST /api/v1/locate
// @access PUBLIC
router.post('/locate', addLocation);

// @route GET SINGLE /api/v1/locate/:id
// @access PUBLIC
router.get('/locate/:id', getSingleLocation);

// @route PUT /api/v1/locate
// @access PUBLIC
router.put('/locate/:id', editLocation);

// @route DEL /api/v1/locate
// @access PUBLIC
router.delete('/locate/:id', deleteLocation);

module.exports = router;