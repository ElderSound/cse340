
import {
    getAllOrganizations,
    getOrganizationDetails
} from '../models/organizations.js';

import { getProjectsByOrganizationId } from '../models/projects.js';

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

export {
    showOrganizationsPage,
    showOrganizationDetailsPage
};
