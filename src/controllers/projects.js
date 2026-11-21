
import {
    getUpcomingProjects,
    getProjectDetails
} from '../models/projects.js';

import { getCategoriesByProjectId } from '../models/categories.js';

/*
 * Service projects controller
 */

// Number of upcoming projects to display
const NUMBER_OF_UPCOMING_PROJECTS = 5;

/*
 * Render the upcoming service projects page.
 */
const showProjectsPage = async (req, res, next) => {
    try {
        // Retrieve the next five upcoming projects
        const projects = await getUpcomingProjects(
            NUMBER_OF_UPCOMING_PROJECTS
        );

        const title = 'Upcoming Service Projects';

        // Render the EJS template with project data
        res.render('projects', { title, projects });

    } catch (error) {
        next(error);
    }
};

/*
 * Render the details page for a specific project.
 */
const showProjectDetailsPage = async (req, res, next) => {
    try {
        // Get the project ID from the URL
        const projectId = req.params.id;

        // Retrieve project details from the database
        const project = await getProjectDetails(projectId);

        // Return 404 if the project does not exist
        if (!project) {
            const err = new Error('Project Not Found');
            err.status = 404;
            return next(err);
        }

        // Retrieve categories associated with this project
        const categories = await getCategoriesByProjectId(projectId);

        const title = project.title;

        // Render the project details page
        res.render('project', {
            title,
            project,
            categories
        });

    } catch (error) {
        next(error);
    }
};

export {
    showProjectsPage,
    showProjectDetailsPage
};
