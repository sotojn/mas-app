import { db } from '../models/index.js';
import config from '../config/auth.config.js';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';

const User = db.user;
const Role = db.role;


export function signup(req:any, res:any) {
  // Save User to Database
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then((user:any) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then((roles:any) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch((err:any) => {
      res.status(500).send({ message: err.message });
    });
};

export function signin(req:any, res:any) {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then((user:any) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

      var authorities:any = [];
      user.getRoles().then((roles:any) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch((err:any) => {
      res.status(500).send({ message: err.message });
    });
};