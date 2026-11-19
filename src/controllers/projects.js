
import { getAllProjects } from '../models/projects.js';

/**
 * Service projects controller
 */

// Render the projects page
const showProjectsPage = async (req, res, next) => {
    try {
        // Retrieve all service projects and their organization names
        const projects = await getAllProjects();

        const title = 'Service Projects';

        // Render the EJS template with the projects data
        res.render('projects', { title, projects });

    } catch (error) {
        next(error);
    }
};

export { showProjectsPage };
