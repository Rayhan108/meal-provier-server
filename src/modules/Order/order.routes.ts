import express from 'express';
import { OrderController } from './order.controller';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../app/middleware/auth';
import validateRequest from '../../app/middleware/validateRequest';
import { AuthValidation } from '../Auth/auth.validation';
const router = express.Router();

// router.post('/', OrderController.createOrder);
router.post('/order',auth(USER_ROLE.customer), OrderController.createOrder)
//   router.get(auth(UserRole.user), orderController.getOrders);
router.get('/orders', auth(USER_ROLE.mealProvider), OrderController.getAllOrders);
router.put('/profile/:userId', auth(USER_ROLE.customer),  validateRequest(AuthValidation.updateUserValidationSchema), OrderController.updateProfile);
router.get("/:id", auth(USER_ROLE.customer), OrderController.getSingleOrders);
export const OrderRoute = router;
