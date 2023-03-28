const asyncHandler = require('express-async-handler');

const Location = require('../models/locationModel');

// geocoder
const geocoder = require('../utils/geocoder');

// @desc GET ALL LOCATION
const getLocation = asyncHandler( async (req, res) => {
    try {
        const locations = await Location.find().sort({ createdAt: 'desc' });

        return res.status(200).json({
            success: true,
            count: locations.length,
            data: locations
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})

// @desc CREATE A LOCATION
const addLocation = asyncHandler(async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                status: 'failure',
                message: 'Add text field'
            })
        }
        console.log(req.body);

        const { address, postalCode, fullName, phoneNumber, attendanceMode } = req.body;
        const loc = await geocoder.geocode(address);
        console.log(loc);

        // breakdown location details
        const saveLocation = {
            fullName,
            phoneNumber,
            attendanceMode,
            address: loc[0].formattedAddress,
            postalCode: loc[0].zipcode,
            location: {
                type: 'Point',
                coordinates: [loc[0].longitude, loc[0].latitude],
                zipCode: loc[0].zipcode
            }
        }
        // check if postalcode exist
        const existLocation = await Location.findOne({address: loc[0].formattedAddress});
        if (existLocation) {
            return res.status(400).json({ error: 'This location already exists' });
        }
        
        const location = await Location.create(saveLocation);

        return res.status(200).json({
            status: 'success',
            data: location
        });

    } catch (error) {
        console.error(error);
        if(error.code === 11000) {
            return res.status(400).json({ error: 'This store already exists' });
        }
        res.status(500).json({ error: 'Server error' });
    }
});

// @desc EDIT A LOCATION
const editLocation = asyncHandler(async (req, res) => {
    try {
        let locate = await Location.findById(req.params.id)
        if (!locate) {
            return res.status(400).json({
                status: 'failure',
                message: 'location does not exist'
            })
        }
        console.log(req.body);

        const { address, postalCode, fullName, phoneNumber, attendanceMode } = req.body;
        const loc = await geocoder.geocode(address);
        console.log(loc);

        // breakdown location details
        const saveLocation = {
            fullName,
            phoneNumber,
            attendanceMode,
            address: loc[0].formattedAddress,
            postalCode: loc[0].zipcode,
            location: {
                type: 'Point',
                coordinates: [loc[0].longitude, loc[0].latitude],
                zipCode: loc[0].zipcode
            }
        }
        
        const location = await Location.findOneAndUpdate({ _id: req.params.id }, saveLocation, {
            new: true,
            runValidators: true
        });

        return res.status(200).json({
            status: 'success',
            data: location
        });

    } catch (error) {
        console.error(error);
        if(error.code === 11000) {
            return res.status(400).json({ error: 'This store already exists' });
        }
        res.status(500).json({ error: 'Server error' });
    }
});

// @desc EDIT A LOCATION
const getSingleLocation = asyncHandler(async (req, res) => {
    try {
        let locate = await Location.findById(req.params.id)
        if (!locate) {
            return res.status(400).json({
                status: 'failure',
                message: 'location does not exist'
            })
        }
        console.log(req.body);

        return res.status(200).json({
            status: 'success',
            data: locate
        });

    } catch (error) {
        console.error(error);
        if(error.code === 11000) {
            return res.status(400).json({ error: 'This store does not exists' });
        }
        res.status(500).json({ error: 'Server error' });
    }
});

// @desc DELETE A LOCATION
const deleteLocation = asyncHandler(async (req, res) => {
    try {
        let locate = await Location.findById(req.params.id)
        if (!locate) {
            return res.status(400).json({
                status: 'failure',
                message: 'location does not exist'
            })
        }
        console.log(req.params.id);
        await Location.findByIdAndDelete({ _id: req.params.id});
        return res.status(200).json({
            status: 'success',
            message: `${req.params.id} deleted`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error'})
    }
});

module.exports = {
    getLocation,
    addLocation,
    editLocation,
    deleteLocation,
    getSingleLocation
}