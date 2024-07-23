import { authJwt } from '../middleware/index.js';
import * as controller from '../controllers/user.controller.js';

export default function(app:any) {
  app.use(function(req:any, res:any, next:any) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/player",
    [authJwt.verifyToken],
    controller.playerBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};