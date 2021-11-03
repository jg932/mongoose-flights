import { Router } from 'express'
const router = Router()
import * as flightsCtrl from "../controllers/flights.js"



/* GET users listing. */
// router.get('/', function(req, res) {
//   res.send('respond with a resource')
// })

router.get("/", flightsCtrl.index)
router.get('/new', flightsCtrl.new)
router.get('/:id', flightsCtrl.show)

router.post("/", flightsCtrl.create)
router.post('/:id/tickets', flightsCtrl.createTicket)
router.post('/:id/destinations', flightsCtrl.addToDestinationsList)

router.delete("/:id", flightsCtrl.delete)
router.delete("/:flightId/tickets/:ticketId", flightsCtrl.deleteTicket)

export {
  router
}
