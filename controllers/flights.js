import { Flight } from "../models/flight.js"
import { Destination } from "../models/destination.js"

function index(req, res) {
  Flight.find({}, function(error, flights) {
    res.render("flights/index", {
      flights,
      error,
      title: "All Flights",
    })
  })
}

function newFlight(req, res) {
  res.render('flights/new', {
    title: "Add Flight,"
  })
}

function create(req, res) {
  let body = {
    airline: req.body.airline,
    airport: req.body.airport,
    flightNo: req.body.flightNo,
    departs: req.body.departs,
  }
  if (body.departs === ""){
    delete body.departs
  }
  const flight = new Flight(body)
  flight.save(function(error) {
    if (error) return res.render('/flights/new')
    res.redirect(`/flights/${flight._id}`)
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('destinations')
  .exec(function(error, flight) {
    Destination.find({_id: {$nin: flight.destinations}}, function(error, destinations) {
      res.render('flights/show', {
        title: 'Flight Detail',
        flight, flight,
        destinations: destinations,
      })
    })
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id, function(error, flight) {
    res.redirect('/flights')
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id, function(error, flight){
    flight.tickets.push(req.body)
    flight.save(function(error) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function addToDestinationsList(req, res){
  Flight.findById(req.params.id, function(error, flight) {
    flight.destinations.push(req.body.destinationId)
    flight.save(function(error) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function deleteTicket(req, res) {
  Flight.Ticket.findByIdAndDelete(req.params.id, function(error, ticket) {
    res.render(`flights/${flight._id}`)
  })
}

export {
  newFlight as new,
  index,
  create,
  show,
  deleteFlight as delete,
  createTicket,
  addToDestinationsList,
  deleteTicket,
}
