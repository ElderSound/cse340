
import {
    getAllCategories,
    getCategoryDetails,
    getCategoriesByProjectId,
    updateCategoryAssignments
} from '../models/categories.js';

import {
    getProjectsByCategoryId,
    getProjectDetails
} from '../models/projects.js';

/*
 * Service categories controller
 */

// Render the categories page
const showCategoriesPage = async (req, res, next) => {
    try {
        // Retrieve all service project categories
        const categories = await getAllCategories();

        const title = 'Service Project Categories';

        // Render the categories list
        res.render('categories', { title, categories });

    } catch (error) {
        next(error);
    }
};

/*
 * Render the details page for a specific category.
 */
const showCategoryDetailsPage = async (req, res, next) => {
    try {
        // Get the category ID from the URL
        const categoryId = req.params.id;

        // Retrieve category details
        const category = await getCategoryDetails(categoryId);

        // Return 404 if the category does not exist
        if (!category) {
            const err = new Error('Category Not Found');
            err.status = 404;
            return next(err);
        }

        // Retrieve projects associated with this category
        const projects = await getProjectsByCategoryId(categoryId);

        const title = category.name;

        // Render the category details page
        res.render('category', {
            title,
            category,
            projects
        });

    } catch (error) {
        next(error);
    }
};

/*
 * Render the form to assign categories to a service project.
 */
const showAssignCategoriesForm = async (req, res, next) => {
    try {
        const projectId = req.params.projectId;

        const projectDetails = await getProjectDetails(projectId);

        // Return 404 if the project does not exist
        if (!projectDetails) {
            const err = new Error('Project Not Found');
            err.status = 404;
            return next(err);
        }

        const categories = await getAllCategories();

        // W04: I use the existing getCategoriesByProjectId model function.
        const assignedCategories = await getCategoriesByProjectId(projectId);

        const title = 'Assign Categories to Project';

        res.render('assign-categories', {
            title,
            projectId,
            projectDetails,
            categories,
            assignedCategories
        });

    } catch (error) {
        next(error);
    }
};

/*
 * Process the category assignment form submission.
 */
const processAssignCategoriesForm = async (req, res, next) => {
    try {
        const projectId = req.params.projectId;
        const selectedCategoryIds = req.body.categoryIds || [];

        // Ensure selectedCategoryIds is an array
        const categoryIdsArray = Array.isArray(selectedCategoryIds)
            ? selectedCategoryIds
            : [selectedCategoryIds];

        await updateCategoryAssignments(projectId, categoryIdsArray);

        req.flash('success', 'Categories updated successfully.');

        res.redirect(`/project/${projectId}`);

    } catch (error) {
        next(error);
    }
};

export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm
};
