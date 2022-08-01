const Bootcamp = require('../models/Bootcamp')
const {ObjectId} = require('mongodb');
const ErrorResponse = require('../utils/errorResponce')
//@desc Get all bootcamps
//@route GET /api/V1/bootcamp
//@access Public
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({success: true, count: bootcamps.length, data: bootcamps})
    } catch (err) {
        res.status(400).json({
            success: false
        })
    }
}

//@desc Get single bootcamp
//@route GET /api/V1/bootcamp/:id
//@access Public
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);
        if (!bootcamp) {
            return res.status(400).json({
                success: false
            })
        }
        res.status(200).json({success: true, data: bootcamp,})
    } catch (err) {
        next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 400))
    }
}

//@desc Create new bootcamp
//@route POST /api/V1/bootcamp
//@access Private
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body)
        res.status(201).json({
            success: true,
            data: bootcamp
        })
    } catch (err) {
        res.status(400).json({
            success: false
        })
    }
}

//@desc Update  bootcamp
//@route PUT /api/V1/bootcamp/:id
//@access Private
exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findOneAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!bootcamp) {
            return res.status(400).json({
                success: false
            })
        }

        res.status(201).json({
            success: true,
            data: bootcamp
        })
    } catch (err) {
        res.status(400).json({
            success: false
        })
    }
}

//@desc Delete  bootcamp
//@route DELETE /api/V1/bootcamp/:id
//@access Private
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findOneAndDelete({_id: new ObjectId(req.params.id)})
        if (!bootcamp) {
            return res.status(404).json({
                success: false,
            })
        }

        res.status(200).json({
            success: true,
            data: bootcamp
        })
    } catch (err) {
        res.status(400).json({
            success: false
        })
    }
}