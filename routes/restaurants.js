import { Router } from 'express'
import * as RestaurantsCtrl from '../controllers/restaurants.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', RestaurantsCtrl.index)

router.get('/new', RestaurantsCtrl.new)

router.get('/:id', RestaurantsCtrl.show)

router.post('/',isLoggedIn , RestaurantsCtrl.create)
router.post('/:id/prevVisits', RestaurantsCtrl.createPrevVisits)

router.get('/:id/edit', RestaurantsCtrl.edit)

router.put('/:id', RestaurantsCtrl.update)

export {
  router
}