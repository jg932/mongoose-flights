import { Router } from 'express'
const router = Router()
import * as flightsCtrl from "../controllers/flights.js"



/* GET users listing. */
// router.get('/', function(req, res) {
//   res.send('respond with a resource')
// })

router.get("/", flightsCtrl.index)
router.get('/new', flightsCtrl.new)

router.post("/", flightsCtrl.create)


export {
  router
}
