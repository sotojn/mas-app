import express from 'express';
import { db } from './models/index.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import cors from 'cors';

const app = express();

/// This ne
let corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const Role = db.role;

await db.sequelize.sync();
// force: true will drop the table if it already exists
await db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to mas-app." });
});

// routes
authRoutes(app);
userRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 5080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "admin"
  });
 
  Role.create({
    id: 2,
    name: "player"
  });
}



// Let's scrap the idea for making one main server for now. 
// import express from 'express';
// import { fileURLToPath } from 'url'
// import path from 'node:path';

// const app = express();
// const __dirname = path.dirname(fileURLToPath(import.meta.url))

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, '../packages/mas-ui/build')));

// // Catch all requests that don't match any API routes and serve the index.html file from the React build
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'my-react-app/build', 'index.html'));
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });