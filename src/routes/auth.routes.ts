import { verifySignUp } from '../middleware/index.js';
import * as controller from '../controllers/auth.controller.js';

export default function(app: any) {
  app.use(function(req:any ,res:any, next:any) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};