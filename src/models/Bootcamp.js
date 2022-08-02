const mongoose = require("mongoose");
const slugify = require('slugify')
const geocoder = require('../utils/geocoder')

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z\d@:%._+~#=]{1,256}\.[a-zA-Z\d()]{1,6}\b([-a-zA-Z\d()@:%_+.~#?&/=]*)/
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/

const BootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxLength: [50, 'Name can not be more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxLength: [500, 'Description can not be more than 500 characters']
    },
    website: {
        type: String,
        match: [urlRegex, 'Please use valid URL with HTTP or HTTPS']
    },
    phone: {
        type: String,
        maxLength: [20, 'Phone  can not be more than 20 characters']
    },
    email: {
        type: String,
        match: [emailRegex, 'Please add valid email']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
    },
    careers: {
        type: [String],
        required: true,
        enum: [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other'
        ]
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must can not be more than 10']
    },
    avgCost: Number,
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    housing: {
        type: Boolean,
        default: false
    },
    jobAssistance: {
        type: Boolean,
        default: false
    },
    jobGuarantee: {
        type: Boolean,
        default: false
    },
    acceptGi: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//Create bootcamp slug from the schema
BootcampSchema.pre('save', function (next) {
    this.slug = slugify(this.name, {lower: true})
    next()
})

//Geocode create location field
BootcampSchema.pre('save', async function (next) {
    const [loc] = await geocoder.geocode(this.address)
    this.location = {
        type: 'Point',
        coordinates: [loc.longitude, loc.latitude],
        formattedAddress: loc.formattedAddress,
        street: loc.streetName,
        city: loc.city,
        state: loc.stateCode,
        zipcode: loc.zipcode,
        country: loc.countryCode,
    }
    next()
})


module.exports = mongoose.model('Bootcamp', BootcampSchema)