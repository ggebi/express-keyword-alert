import _ from 'lodash';
import express from 'express';
import boardRoutes from './board.route';
// import commentsRoutes from './comments.route';
import swaggerRoutes from './swagger.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/boards',
    route: boardRoutes,
  },
  // {
  //   path: '/comments',
  //   route: commentsRoutes,
  // },
];

const devRoutes = [
  {
    path: '/docs',
    route: swaggerRoutes,
  },
];

_.forEach(defaultRoutes, (route) => {
  router.use(route.path, route.route);
});

if (['development', 'staging'].includes(process.env.NODE_ENV)) {
  _.forEach(devRoutes, (route) => {
    router.use(route.path, route.route);
  });
}

export default router;
