import { db } from '../models/index.js';

const ROLES = db.ROLES;
const User = db.user;

function checkDuplicateUsernameOrEmail(req:any , res:any, next:any) {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then((user: any) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then((user: any) => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

function checkRolesExisted(req:any, res:any, next:any) {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

export const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};