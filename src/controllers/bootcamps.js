const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')


//@desc Get all bootcamps
//@route GET /api/V1/bootcamp
//@access Public
exports.getListBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({success: true, count: bootcamps.length, data: bootcamps})
})

//@desc Get single bootcamp
//@route GET /api/V1/bootcamp/:id
//@access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 400))
    }
    res.status(200).json({success: true, data: bootcamp})
})

//@desc Create new bootcamp
//@route POST /api/V1/bootcamp
//@access Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({
        success: true,
        data: bootcamp
    })
})

//@desc Update bootcamp
//@route PUT /api/V1/bootcamp/:id
//@access Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findOneAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 400))
    }

    res.status(201).json({
        success: true,
        data: bootcamp
    })
})

//@desc Delete bootcamp
//@route DELETE /api/V1/bootcamp/:id
//@access Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findOneAndDelete(req.params.id)
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 400))
    }
    res.status(200).json({
        success: true,
        data: bootcamp
    })
})