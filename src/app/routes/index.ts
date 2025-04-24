import { Router } from 'express';
import { AuthRoutes } from '../../modules/Auth/auth.routes';
import { UserRoutes } from '../../modules/User/user.routes';
import { OrderRoute } from '../../modules/Order/order.routes';



const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes,
      },
      {
        path: '/customers',
        route: OrderRoute,
      },
      {
        path: '/user',
        route: UserRoutes,
      },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
