import express from 'express';

import { USER_ROLE } from '../User/user.constant';
import auth from '../../app/middleware/auth';
import validateRequest from '../../app/middleware/validateRequest';
import { AuthValidation } from '../Auth/auth.validation';
import { providerController } from './provider.controller';
const router = express.Router();

// router.post('/', OrderController.createOrder);
router.post('/menu',auth(USER_ROLE.mealProvider), providerController.createMenu)

router.get('/orders', auth(USER_ROLE.mealProvider), providerController.getAllOrders);

export const ProviderRoute = router;
