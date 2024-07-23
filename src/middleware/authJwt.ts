import jwt from 'jsonwebtoken';
import config from '../config/auth.config.js';
import { db } from '../models/index.js';

const User = db.user;

function verifyToken(req:any, res:any, next:any) {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token,
            config.secret,
            (err:any , decoded:any) => {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              req.userId = decoded.id;
              next();
            });
};

function isAdmin(req:any, res:any, next:any) {
  User.findByPk(req.userId).then((user:any) => {
    user.getRoles().then((roles:any) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

function isModerator(req:any, res:any, next:any) {
  User.findByPk(req.userId).then((user:any) => {
    user.getRoles().then((roles:any) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

function isModeratorOrAdmin(req:any, res:any, next:any) {
  User.findByPk(req.userId).then((user:any) => {
    user.getRoles().then((roles:any) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

export const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin
};