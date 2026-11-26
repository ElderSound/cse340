
import express from 'express';

// Import controller functions
import { showHomePage } from './controllers/index.js';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm,
    organizationValidation
} from './controllers/organizations.js';

import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm
} from './controllers/categories.js';

import { testErrorPage } from './controllers/errors.js';

// Create Express router
const router = express.Router();

/**
 * Routes
 */

// Render the home page
router.get('/', showHomePage);

// Render the organizations page
router.get('/organizations', showOrganizationsPage);

// Render the details of a specific organization
router.get('/organization/:id', showOrganizationDetailsPage);

// Render the new organization form
router.get('/new-organization', showNewOrganizationForm);

// Handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Render the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);

// Handle edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Render the upcoming projects page
router.get('/projects', showProjectsPage);

// Render the details of a specific project
router.get('/project/:id', showProjectDetailsPage);

// Render the new project form
router.get('/new-project', showNewProjectForm);

// Handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);

// Render the edit project form
router.get('/edit-project/:id', showEditProjectForm);

// Handle edit project form submission
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

// Render the categories page
router.get('/categories', showCategoriesPage);

// Render the details of a specific category
router.get('/category/:id', showCategoryDetailsPage);

// Render the assign categories form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);

// Handle category assignments
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// Test route for 500 errors
router.get('/test-error', testErrorPage);

export default router;
