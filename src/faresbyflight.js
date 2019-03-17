const mongoose = require('mongoose');

const faresbyflightSchema = mongoose.Schema({_id: mongoose.Schema.Types.ObjectId});

module.exports = mongoose.model('faresbyflight', faresbyflightSchema);