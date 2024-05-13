const mongoose = require('mongoose')

const GeoSchema = new mongoose.Schema({
    country: String,
    title: String,
    sector: String, 
    start_year: String
   
})

const Geo = mongoose.model("Geo", GeoSchema)
module.exports = Geo