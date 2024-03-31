const Destination = require("../models/destinationModel");

exports.create = async (req, res) => {
    try {
      const destination = new Destination(req.body);
      const savedDestination = await destination.save();
      res.status(201).send(savedDestination);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  exports.findAll = async (req, res) => {
    try {
      const destinations = await Destination.find();
      res.send(destinations);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  exports.findOne = async (req, res) => {
    try {
      const destination = await Destination.findById(req.params.id);
      if (!destination) {
        return res.status(404).send({ message: 'Destination not found' });
      }
      res.send(destination);
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Invalid ID format' });
    }
    res.status(500).send({ message: 'Error fetching destination' });
  }
};

  exports.update = async (req, res) => {
    try {
      const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!destination) {
        return res.status(404).send();
      }
      res.send(destination);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  exports.delete = async (req, res) => {
    try {
      const destination = await Destination.findByIdAndDelete(req.params.id);
      if (!destination) {
        return res.status(404).send();
      }
      res.send(destination);
    } catch (error) {
      res.status(500).send(error);
    }
  };