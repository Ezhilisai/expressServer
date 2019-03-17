const mongoose = require('mongoose');

const countryCodeSchema = mongoose.Schema({_id: mongoose.Schema.Types.ObjectId});

module.exports = mongoose.model('countrycodes', countryCodeSchema);