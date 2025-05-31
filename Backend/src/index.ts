import express from 'express';
import path from 'path';
import helloRoutes from './routes/hello.routes.js'
import createTaskRoutes from './routes/tasks.route.js'
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

const frontendPath = path.join(__dirname, '../dist/frontend');
app.use(express.static(frontendPath));

// Example API route
app.use(express.json());
app.use('/api', helloRoutes);

app.use('/api/tasks', createTaskRoutes);

app.use("/api/*", (req, res) => {
    res.status(404).json({ message: 'API endpoint not found' });
  });

app.get("*", (_req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'), {
        headers: {
          'Content-Type': 'text/html',
        },
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`)
});
