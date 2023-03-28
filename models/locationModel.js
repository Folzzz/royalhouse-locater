const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// geocoder module
const geocoder = require('../utils/geocoder');

const locationSchema = new Schema({
    fullName: {
      type: String,
      required: [true, 'Please include a name']
    },
    phoneNumber: {
      type: Number,
      required: [true, 'Please include a phone number']
    },
    attendanceMode: {
      type: String,
      required: [true, 'Select a mode']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        zipCode: String,
        formattedAddress: String
    },
    postalCode: {
        type: String,
        required: [true, 'Please add a postal code']
    }
}, { timestamps: true });

// geocode and create location
// locationSchema.pre('save', async (next) => {
//   const loc = await geocoder.geocode(locationSchema.address);
//   console.log(loc);
//   next();
// })

const Location = mongoose.model('Locations', locationSchema);

module.exports = Location;