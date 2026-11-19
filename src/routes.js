
import express from 'express';

// Import controller functions
import { showHomePage } from './controllers/index.js';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage
} from './controllers/organizations.js';

import { showProjectsPage } from './controllers/projects.js';
import { showCategoriesPage } from './controllers/categories.js';
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

// Render the projects page
router.get('/projects', showProjectsPage);

// Render the categories page
router.get('/categories', showCategoriesPage);

// Test route for 500 errors
router.get('/test-error', testErrorPage);

export default router;
