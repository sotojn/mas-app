import express from 'express';
import { fileURLToPath } from 'url'
import path from 'node:path';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../packages/mas-ui/build')));

// Catch all requests that don't match any API routes and serve the index.html file from the React build
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'my-react-app/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});