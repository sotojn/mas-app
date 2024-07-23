import config from '../config/db.config.js';
import { Sequelize, DataTypes, Dialect } from 'sequelize';
import user from '../models/user.model.js';
import role from '../models/role.model.js';
// import pg from 'pg';

/// Setup new postgress client
// const { Client } = pg;
// const client = new Client(config);
// await client.connect();

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect as Dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

export const db = {
  Sequelize,
  sequelize,
  user: user(sequelize, Sequelize),
  role: role(sequelize, Sequelize),
  ROLES: ['admin', 'player']

};

db.role.belongsToMany(db.user, {
  through: 'user_roles'
});
db.user.belongsToMany(db.role, {
  through: 'user_roles'
});