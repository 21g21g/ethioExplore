const Destination = require("../models/destinationModel");

exports.create = async (req, res) => {
    try {
        const destination = new Destination(req.body);
        const savedDestination = await destination.save();
        res.status(201).json({data: savedDestination});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

exports.findAll = async (req, res) => {
    try {
        let destinations;
        if (req.query.top) {
            // Return top 8 destinations based on ratings
            const limit = parseInt(req.query.top, 10) || 8;
            destinations = await Destination.find().sort({ratings: -1}).limit(limit);
        } else {
            // Return all destinations without any sorting or limiting
            destinations = await Destination.find();
        }
        res.status(200).json({data: destinations});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


exports.findOne = async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return res.status(404).json({message: 'Destination not found'});
        }
        res.status(200).json({data: destination});
    } catch (error) {
        let errorMessage = 'Error fetching destination';
        if (error.kind === 'ObjectId') {
            errorMessage = 'Invalid ID format';
        }
        res.status(500).json({message: errorMessage});
    }
};

exports.update = async (req, res) => {
    try {
        const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!destination) {
            return res.status(404).json({message: 'Destination not found'});
        }
        res.status(200).json({data: destination});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

exports.delete = async (req, res) => {
    try {
        const destination = await Destination.findByIdAndDelete(req.params.id);
        if (!destination) {
            return res.status(404).json({message: 'Destination not found'});
        }
        res.status(200).json({message: 'Destination deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.findByRegion = async (req, res) => {
    const {regionName} = req.params;
    try {
        const destinations = await Destination.find({"location.region": regionName});
        res.status(200).json({data: destinations});
    } catch (error) {
        res.status(500).json({message: "Error retrieving destinations for region " + regionName});
    }
};
