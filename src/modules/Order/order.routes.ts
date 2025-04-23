import express from 'express';
import { OrderController } from './order.controller';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../app/middleware/auth';
const router = express.Router();

// router.post('/', OrderController.createOrder);
router.post('/',auth(USER_ROLE.customer), OrderController.createOrder)
//   router.get(auth(UserRole.user), orderController.getOrders);
router.get('/orders', auth(USER_ROLE.mealProvider), OrderController.getAllOrders);

router.get("/:id", auth(USER_ROLE.customer), OrderController.getSingleOrders);
export const OrderRoute = router;
