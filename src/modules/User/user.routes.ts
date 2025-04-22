/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import { USER_ROLE } from './user.constant';

import validateRequest from '../../app/middleware/validateRequest';
import { changeStatusValidationSchema } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../app/middleware/auth';

const router = express.Router();

router.post(
  '/change-status/:id',
  auth(USER_ROLE.mealProvider),
  validateRequest(changeStatusValidationSchema),
  UserControllers.changeStatus,
);
router.get('/:userId',UserControllers.getSingleUser)
router.get('/allUser',UserControllers.getAllUser)

export const UserRoutes = router;
