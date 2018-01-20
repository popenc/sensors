// sensor object with attributes and functions

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var sensorSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true }, // general name of sensor (e.g., grill temp, oyster hum, etc.)
  type: { type: String, required: true }, // e.g., temperature, humidity, piezo, etc.
  application: { type: String, default: "" }, // what the sensor is used for
  data: {
  	values: [{
      time: { type: String, default: "00-00-00 00:00:00" },
      temp: { type: Number, default: -99.99 }
    }], // list of timestamp,value pairs for plotting
  	units: { type: String, default: "" }, // units of measurement (e.g., degF)
  	triggers: [{
  		time: { type: String, default: "" },
  		trigger: { type: String, default: "" } // any notable events (watering, stirring, etc.)
  	}],
  },
  meta: {
    description: { type: String, default: "" }, // more detail on use, etc.
    sensor_id: { type: String, default: "" }, // sensor's part number (e.g., LM335)
    datasheet: { type: String, default: "" }, // link to datasheet, or actual datasheet (depends on memory)
    circuit_diagram: { type: String, default: "" }, // image of circuit diagram
  }
});

// add a custom method to sensorSchema:
// sensorSchema.methods.dudify = function() {
//   this.name = this.name + '-dude'; 
//   return this.name;
// };

// create model
var Sensor = mongoose.model('Sensor', sensorSchema);

// make this available to our users in our Node applications
module.exports = Sensor;