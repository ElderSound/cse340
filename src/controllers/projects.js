
import {
    getUpcomingProjects,
    getProjectDetails,
    createProject,
    updateProject
} from '../models/projects.js';

import { getCategoriesByProjectId } from '../models/categories.js';

import { getAllOrganizations } from '../models/organizations.js';

import { body, validationResult } from 'express-validator';

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

// Define validation rules for service project forms
const projectValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required')
        .isLength({ max: 200 }).withMessage('Location must be less than 200 characters'),
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Date must be a valid date format'),
    body('organizationId')
        .notEmpty().withMessage('Organization is required')
        .isInt().withMessage('Organization must be a valid integer')
];

// W04: I used the server-side limits because they differ from the form example.

// Render the form for creating a new service project
const showNewProjectForm = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();
        const title = 'Add New Service Project';

        res.render('new-project', { title, organizations });

    } catch (error) {
        next(error);
    }
};

// Process the new service project form submission
const processNewProjectForm = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Loop through validation errors and flash them
            errors.array().forEach((error) => {
                req.flash('error', error.msg);
            });

            // Redirect back to the new project form
            return res.redirect('/new-project');
        }

        const { title, description, location, date, organizationId } = req.body;

        // Create the new project in the database
        const newProjectId = await createProject(
            title,
            description,
            location,
            date,
            organizationId
        );

        req.flash('success', 'New service project created successfully!');
        res.redirect(`/project/${newProjectId}`);

    } catch (error) {
        next(error);
    }
};

// Render the edit service project form
const showEditProjectForm = async (req, res, next) => {
    try {
        const projectId = req.params.id;

        const project = await getProjectDetails(projectId);

        if (!project) {
            const err = new Error('Project Not Found');
            err.status = 404;
            return next(err);
        }

        const organizations = await getAllOrganizations();
        const title = 'Edit Service Project';

        res.render('edit-project', {
            title,
            project,
            organizations
        });

    } catch (error) {
        next(error);
    }
};

// Process the edit service project form submission
const processEditProjectForm = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors.array().forEach((error) => {
                req.flash('error', error.msg);
            });

            return res.redirect(`/edit-project/${req.params.id}`);
        }

        const projectId = req.params.id;
        const { title, description, location, date, organizationId } = req.body;

        await updateProject(
            projectId,
            title,
            description,
            location,
            date,
            organizationId
        );

        req.flash('success', 'Service project updated successfully!');
        res.redirect(`/project/${projectId}`);

    } catch (error) {
        next(error);
    }
};

export {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation
};
