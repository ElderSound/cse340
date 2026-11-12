
import express from 'express';

import { fileURLToPath } from 'url';
import path from 'path';

// Import PostgreSQL database connection
import { testConnection } from './src/models/db.js';

// Import database models
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

// Get the full path of server.js
const __filename = fileURLToPath(import.meta.url);

// Get the directory containing server.js
const __dirname = path.dirname(__filename);

// Express app instance
const app = express();

/*
 * Configure Express middleware
 */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Set the directory for EJS templates
app.set('views', path.join(__dirname, 'src/views'));


/*
 * Routes
 */

// Render the home page
app.get('/', async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
});

// Render the organizations page
app.get('/organizations', async (req, res) => {
    try {
        // Retrieve all organizations from the database
        const organizations = await getAllOrganizations();

        const title = 'Our Partner Organizations';

        // Render the EJS template with the organizations data
        res.render('organizations', { title, organizations });

    } catch (error) {
        console.error('Error retrieving organizations:', error);
        res.status(500).send('Error loading organizations');
    }
});

// Render the projects page
app.get('/projects', async (req, res) => {
    try {
        // Retrieve all service projects and their organization names
        const projects = await getAllProjects();

        const title = 'Service Projects';

        // Render the EJS template with the projects data
        res.render('projects', { title, projects });

    } catch (error) {
        console.error('Error retrieving projects:', error);
        res.status(500).send('Error loading projects');
    }
});

// Render the categories page
app.get('/categories', async (req, res) => {
    const title = 'Service Project Categories';
    res.render('categories', { title });
});


/*
 * Start the Express server
 * Test the PostgreSQL database connection
 */

app.listen(PORT, async () => {
    try {
        // Verify the database connection
        await testConnection();

        // Display server information
        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);

    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});
