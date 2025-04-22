import express from 'express';
import validateRequest from '../../app/middleware/validateRequest';

import { AuthControllers } from './auth.controller';

import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerUserValidationSchema),
  AuthControllers.registerUser,
);
router.post('/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.userLogin
)
router.post('/changePassword',
    auth(
        USER_ROLE.mealProvider,
        USER_ROLE.customer,
      ),
    validateRequest(AuthValidation.changePasswordValidationSchema),
    AuthControllers.changePassword
)
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);


export const AuthRoutes = router;
