const express = require('express')
const {
    getListBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius
} = require('../controllers/bootcamps')
const router = express.Router()

router.route('/radius/:postcode/:distance')
    .get(getBootcampsInRadius)

router.route('/')
    .get(getListBootcamps)
    .post(createBootcamp)

router.route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp)



module.exports = router