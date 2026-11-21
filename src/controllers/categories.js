
import {
    getAllCategories,
    getCategoryDetails
} from '../models/categories.js';

import { getProjectsByCategoryId } from '../models/projects.js';

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

export {
    showCategoriesPage,
    showCategoryDetailsPage
};
