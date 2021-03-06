import mongoose from "mongoose"

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  row: {
    type: String, 
    enum: ["A", "B", "C", "D", "E", "F"]
  },
  seat: {
    type: Number,
    min: 1,
    max: 9,
  },
  price: {
    type: Number, 
    min: 0,
  }
}, {timestamps: true
})

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    enum: ["American", "Southwest", "United",]
  },
  airport: {
    type: String, 
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN",],
    default: "DEN",
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999,
  },
  departs: {
    type: Date,
    default: function() {
      return new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    }
  }, 
  tickets: {
    type: [ticketSchema],
  },
  destinations: [{type: Schema.Types.ObjectId, ref: "Destination"}]
}, {timestamp: true
})

const Flight = mongoose.model("Flight", flightSchema)


export {
  Flight,
}