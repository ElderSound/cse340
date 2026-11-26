
import {
    getAllOrganizations,
    getOrganizationDetails,
    createOrganization,
    updateOrganization
} from '../models/organizations.js';

import { getProjectsByOrganizationId } from '../models/projects.js';

import { body, validationResult } from 'express-validator';

/**
 * Organizations controller
 */

// Render the organizations page
const showOrganizationsPage = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();

        const title = 'Our Partner Organizations';

        res.render('organizations', { title, organizations });

    } catch (error) {
        next(error);
    }
};

// Render the details page for a specific organization
const showOrganizationDetailsPage = async (req, res, next) => {
    try {
        const organizationId = req.params.id;

        // Retrieve the selected organization
        const organizationDetails =
            await getOrganizationDetails(organizationId);

        // Return 404 if the organization does not exist
        if (!organizationDetails) {
            const err = new Error('Organization Not Found');
            err.status = 404;
            return next(err);
        }

        // Retrieve projects associated with the organization
        const projects =
            await getProjectsByOrganizationId(organizationId);

        const title = 'Organization Details';

        // Render the organization details page
        res.render('organization', {
            title,
            organizationDetails,
            projects
        });

    } catch (error) {
        next(error);
    }
};

// Define validation rules for organization form
const organizationValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Organization name must be between 3 and 150 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Organization description is required')
        .isLength({ max: 500 })
        .withMessage('Organization description cannot exceed 500 characters'),
    body('contactEmail')
        .normalizeEmail()
        .notEmpty()
        .withMessage('Contact email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
];

// Render the form for creating a new organization
const showNewOrganizationForm = async (req, res) => {
    const title = 'Add New Organization';

    res.render('new-organization', { title });
};

// Process the new organization form submission
const processNewOrganizationForm = async (req, res, next) => {
    try {
        // Check for validation errors
        const results = validationResult(req);

        if (!results.isEmpty()) {
            // Validation failed - loop through errors
            results.array().forEach((error) => {
                req.flash('error', error.msg);
            });

            // Redirect back to the new organization form
            return res.redirect('/new-organization');
        }

        const { name, description, contactEmail } = req.body;
        const logoFilename = 'placeholder-logo.png'; // Use the placeholder logo for all new organizations

        const organizationId = await createOrganization(
            name,
            description,
            contactEmail,
            logoFilename
        );

        // Set a success flash message
        req.flash('success', 'Organization added successfully!');

        res.redirect(`/organization/${organizationId}`);

    } catch (error) {
        next(error);
    }
};

// Render the edit organization form
const showEditOrganizationForm = async (req, res, next) => {
    try {
        const organizationId = req.params.id;
        const organizationDetails =
            await getOrganizationDetails(organizationId);

        if (!organizationDetails) {
            const err = new Error('Organization Not Found');
            err.status = 404;
            return next(err);
        }

        const title = 'Edit Organization';

        res.render('edit-organization', {
            title,
            organizationDetails
        });

    } catch (error) {
        next(error);
    }
};

// Process the edit organization form submission
const processEditOrganizationForm = async (req, res, next) => {
    try {
        // Check for validation errors
        const results = validationResult(req);

        if (!results.isEmpty()) {
            // Validation failed - loop through errors
            results.array().forEach((error) => {
                req.flash('error', error.msg);
            });

            // Redirect back to the edit organization form
            return res.redirect('/edit-organization/' + req.params.id);
        }

        const organizationId = req.params.id;
        const { name, description, contactEmail, logoFilename } = req.body;

        await updateOrganization(
            organizationId,
            name,
            description,
            contactEmail,
            logoFilename
        );

        // Set a success flash message
        req.flash('success', 'Organization updated successfully!');

        res.redirect(`/organization/${organizationId}`);

    } catch (error) {
        next(error);
    }
};

export {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm,
    organizationValidation
};
