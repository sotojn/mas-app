export default {
  HOST: "db",
  USER: "postgres",
  PASSWORD: "massword",
  DB: "postgres",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

// export default {
//   user: 'mas-user',
//   password: 'password123',
//   host: 'localhost',
//   port: 5334,
//   database: 'mas-db',
// }