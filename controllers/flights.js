import { Flight } from "../models/flight.js"

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

async function create(req, res) {
  let body = {
    airline: req.body.airline,
    airport: req.body.airport,
    flightNo: req.body.flightNo,
    departs: req.body.departs,
  }
  if (body.departs === ""){
    delete body.departs
  }
  const flight = await new Flight(body)
  flight.save(function(error) {
    if (error) return res.render('/flights/new')
    res.redirect('/flights')
  })
}


// Flight.create(req.body, function(error, flight){
//   if (error) {
//     console.log(error)
//     return res.redirect("/flights/new")
//   }
//   res.redirect(`/flights/${flight._id}`)
// })


export {
  newFlight as new,
  index,
  create,
}
