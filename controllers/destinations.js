import { Destination } from "../models/destination.js";

function newDestination(req, res) {
  Destination.find({}, function(error, destinations){
    res.render("destinations/new", {
      title: "Add Destination",
      destinations: destinations,
    })
  })
}

function create(req, res) {
  Destination.create(req.body, function(error, destination){
    res.redirect("/destinations/new")
  })
}

export {
  newDestination as new,
  create
}