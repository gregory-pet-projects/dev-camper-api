//@desc Get all bootcamps
//@route GET /api/V1/bootcamp
//@access Public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({success: true, msg: 'Show all bootcamps',hello:req.hello})
}

//@desc Get single bootcamp
//@route GET /api/V1/bootcamp/:id
//@access Public
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: `Get bootcamp ${req.params.id}`})
}

//@desc Create new bootcamp
//@route POST /api/V1/bootcamp
//@access Private
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: 'Create new bootcamp'})
}

//@desc Update  bootcamp
//@route PUT /api/V1/bootcamp/:id
//@access Private
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: `Update bootcamp ${req.params.id}`})
}

//@desc Delete  bootcamp
//@route DELETE /api/V1/bootcamp/:id
//@access Private
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: `Delete bootcamp ${req.params.id}`})
}